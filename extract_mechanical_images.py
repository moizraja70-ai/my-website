
import os
import re
import base64

def extract_and_update():
    md_path = r"c:\Users\b\Downloads\dentedge\MEHCNAICAL .md"
    ts_path = r"c:\Users\b\Downloads\dentedge\data\dentalMaterialProperties.ts"
    assets_dir = r"c:\Users\b\Downloads\dentedge\public\assets\mechanical"
    
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Dictionary to map image ID to filename
    image_map = {}

    # 1. Find all image definitions: [image1]: <data:image/png;base64,.....>
    # Regex to capture id and data
    # [image(\d+)]: <data:image/(png|jpeg|jpg);base64,(.+?)>
    
    pattern = re.compile(r'^\[image(\d+)\]:\s*<data:image/(png|jpeg|jpg);base64,(.+?)>', re.MULTILINE)
    
    matches = pattern.findall(content)
    print(f"Found {len(matches)} images.")

    for m in matches:
        img_id = m[0]
        ext = m[1]
        b64_data = m[2]
        
        filename = f"image{img_id}.{ext}"
        filepath = os.path.join(assets_dir, filename)
        
        # Decode and save
        try:
            img_data = base64.b64decode(b64_data)
            with open(filepath, 'wb') as f_img:
                f_img.write(img_data)
            print(f"Saved {filename}")
            
            # Map for replacement
            # Mapping [imageX] to /assets/mechanical/imageX.png
            image_map[f"image{img_id}"] = f"/assets/mechanical/{filename}"
            
        except Exception as e:
            print(f"Failed to save image{img_id}: {e}")

    # 2. Process content to replace ![][imageX] with ![imageX](/path)
    # First, separate body from definitions (definitions are usually at the end)
    # We can just remove the definitions lines first.
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        # Skip definition lines
        if re.match(r'^\[image\d+\]:\s*<data:', line):
            continue
            
        # Replace usages: ![][image1] -> ![image1](/assets/mechanical/image1.png)
        # Regex for usage: !\[\]\[image(\d+)\]
        
        def replace_match(match):
            img_key = f"image{match.group(1)}"
            if img_key in image_map:
                return f"![{img_key}]({image_map[img_key]})"
            return match.group(0) # No change if not found
            
        new_line = re.sub(r'!\[\]\[image(\d+)\]', replace_match, line)
        new_lines.append(new_line)

    clean_md_content = "\n".join(new_lines).strip()
    
    # Escape backticks for JS template literal
    clean_md_content = clean_md_content.replace('`', '\\`')
    clean_md_content = clean_md_content.replace('${', '\\${')

    # 3. Update TS file
    with open(ts_path, 'r', encoding='utf-8') as f:
        ts_content = f.read()

    start_marker = "export const DENTAL_MATERIAL_PROPERTIES_MECHANICAL_NOTES = String.raw`"
    idx_start = ts_content.find(start_marker)
    
    thermal_marker = "export const DENTAL_MATERIAL_PROPERTIES_THERMAL_NOTES = String.raw`"
    idx_thermal = ts_content.find(thermal_marker)
    
    if idx_start == -1 or idx_thermal == -1:
        print("Error: Markers not found in TS file.")
        return

    prefix = ts_content[:idx_start + len(start_marker)]
    suffix = ts_content[idx_thermal:]
    
    new_ts_content = prefix + "\n" + clean_md_content + "\n`;\n\n" + suffix
    
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(new_ts_content)
        
    print("Successfully updated dentalMaterialProperties.ts with images.")

if __name__ == "__main__":
    extract_and_update()
