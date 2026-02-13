import re
import os

def parse_style(style_str):
    styles = {}
    if not style_str:
        return styles
    parts = style_str.split(';')
    for part in parts:
        if ':' in part:
            key, val = part.split(':', 1)
            styles[key.strip()] = val.strip()
    return styles

def css_size_to_float(size_str):
    if 'px' in size_str:
        return float(size_str.replace('px', ''))
    return 11.0 # Default

def process_file(input_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the HTML content from the JS string
    # It starts after privacy export const mechanicalPropertiesHTML = ` and ends before `;
    start_tag = 'export const mechanicalPropertiesHTML = `'
    end_tag = '`;'
    
    start_idx = content.find(start_tag)
    if start_idx == -1:
        print("Could not find start tag")
        return
    
    start_idx += len(start_tag)
    end_idx = content.rfind(end_tag)
    
    html_content = content[start_idx:end_idx]
    
    # Naive manual parsing of the simplified HTML structure
    # We look for <div class="line">...</div>
    
    lines = re.findall(r'<div class="line">(.*?)</div>', html_content, re.DOTALL)
    
    markdown_lines = []
    
    for line_html in lines:
        # Each line has one or more spans
        # <span style="...">text</span>
        
        spans = re.findall(r'<span style="(.*?)">(.*?)</span>|([^<]+)', line_html)
        
        line_text = ""
        max_size = 0
        is_bold_line = False
        
        # Check if line is just whitespace
        clean_html_text = re.sub(r'<[^>]+>', '', line_html).strip()
        if not clean_html_text:
            markdown_lines.append("")
            continue

        raw_text_accum = ""

        # Processing spans
        # We need to reconstruct the line with markdown
        # formatting applied to spans.
        
        # However, checking if the WHOLE line is a header is commonly better
        # based on the max font size in the line.
        
        # First pass: analyze line properties
        spans_data = [] # list of (text, is_bold, is_italic, size)
        
        # The re.findall above is a bit tricky with mixed content.
        # Let's use a simpler approach: splitting by span tags is messy.
        # Let's just iterate over the parts.
        
        # Actually, let's just parse the line_html using regex strictly for span tags
        # Assuming the structure is primarily spans.
        
        # Hacky simple parser for this specific file format
        parts = re.split(r'(<span style="[^"]*">.*?</span>)', line_html)
        
        current_line_md = ""
        
        line_max_size = 0.0
        line_is_bold_overall = True
        has_content = False
        
        parsed_spans = []

        for part in parts:
            if not part: continue
            
            if part.startswith('<span'):
                # Extract style and content
                m = re.match(r'<span style="(.*?)">(.*?)</span>', part)
                if m:
                    style_str = m.group(1)
                    text = m.group(2)
                    
                    # specific replacement for &quot; etc if needed, but usually python handles it?
                    # Minimal unescape
                    text = text.replace('&quot;', '"').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                    
                    styles = parse_style(style_str)
                    
                    weight = styles.get('font-weight', 'normal')
                    is_bold = '700' in weight or 'bold' in weight
                    
                    style_prop = styles.get('font-style', 'normal')
                    is_italic = 'italic' in style_prop
                    
                    size = css_size_to_float(styles.get('font-size', '11.0px'))
                    
                    parsed_spans.append({
                        'text': text,
                        'bold': is_bold,
                        'italic': is_italic,
                        'size': size
                    })
                    
                    if size > line_max_size:
                        line_max_size = size
                    if not is_bold and text.strip():
                        line_is_bold_overall = False
                    if text.strip():
                        has_content = True
            else:
                # Text outside spans (whitespace mostly in this file structure)
                text = part
                text = text.replace('&quot;', '"').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                if text.strip():
                    parsed_spans.append({
                        'text': text,
                        'bold': False,
                        'italic': False,
                        'size': 11.0
                    })
                    line_is_bold_overall = False
                    has_content = True
        
        if not has_content:
            markdown_lines.append("")
            continue
            
        # Determine header level
        prefix = ""
        if line_max_size >= 24:
            prefix = "# "
        elif line_max_size >= 18:
            prefix = "## "
        elif line_max_size >= 16:
            prefix = "### "
        elif line_max_size >= 13:
            prefix = "#### "
        elif line_max_size >= 12 and line_is_bold_overall:
             # Often these are small subheaders
            prefix = "#### "
        
        # Construct the line
        built_line = ""
        for span in parsed_spans:
            txt = span['text']
            # If line is a header, we generally don't bold individual parts inside headers in markdown
            # (renders weirdly sometimes), but we should preserve italics.
            
            chunk = txt
            if prefix:
                # Inside a header
                if span['italic']:
                    chunk = f"*{chunk}*"
            else:
                # Normal text
                if span['bold'] and span['italic']:
                    chunk = f"***{chunk}***"
                elif span['bold']:
                    chunk = f"**{chunk}**"
                elif span['italic']:
                    chunk = f"*{chunk}*"
            
            built_line += chunk
            
        markdown_lines.append(prefix + built_line)

    return "\n".join(markdown_lines)

if __name__ == "__main__":
    result = process_file(r"c:\Users\b\Downloads\dentedge\mechanical_properties_exact.js")
    # Post-processing cleanup
    # Remove excessive newlines
    result = re.sub(r'\n{3,}', '\n\n', result)
    
    # Save to a file to inspect
    with open("extracted_mechanical.md", "w", encoding="utf-8") as f:
        f.write(result)
    
    print("Extraction complete. Check extracted_mechanical.md")
