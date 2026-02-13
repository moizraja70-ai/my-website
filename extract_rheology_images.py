
import os
import re
import base64

def extract_and_update():
    ts_path = r"c:\Users\b\Downloads\dentedge\data\dentalMaterialPropertiesRheology.ts"
    assets_dir = r"c:\Users\b\Downloads\dentedge\public\assets\rheology"
    
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)

    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Dictionary to map image ID to filename
    image_map = {}

    # 1. Find all image definitions: [image1]: <data:image/png;base64,.....>
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
            image_map[f"image{img_id}"] = f"/assets/rheology/{filename}"
            
        except Exception as e:
            print(f"Failed to save image{img_id}: {e}")

    # 2. Remove definition lines and replace usages
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        # Skip definition lines
        if re.match(r'^\[image\d+\]:\s*<data:', line):
            continue
            
        # Replace usages: ![][image1] -> ![image1](/assets/rheology/image1.png)
        # also handle *![][image1]* variants by just looking for ![][imageX]
        
        def replace_match(match):
            img_key = f"image{match.group(1)}"
            if img_key in image_map:
                return f"![{img_key}]({image_map[img_key]})"
            return match.group(0)
            
        new_line = re.sub(r'!\[\]\[image(\d+)\]', replace_match, line)
        new_lines.append(new_line)

    new_content = "\n".join(new_lines)
    
    # 3. Update TS file
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Successfully updated dentalMaterialPropertiesRheology.ts with images.")

if __name__ == "__main__":
    extract_and_update()
