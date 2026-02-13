
import fitz  # PyMuPDF
import os

def extract_images():
    pdf_path = r"c:\Users\b\Downloads\dentedge\themar properties.pdf"
    assets_dir = r"c:\Users\b\Downloads\dentedge\public\assets\thermal"
    
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
        
    doc = fitz.open(pdf_path)
    
    # We expect images on specific pages based on the previous text cues
    # Page numbers in PDF are 0-indexed in code, but 1-indexed in human talk.
    # Text said: page=3, page=4, page=6. 
    # Let's verify by just extracting all and labeling them.
    
    extracted_count = 0
    
    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images()
        
        if image_list:
            print(f"Page {page_index + 1}: Found {len(image_list)} images")
        
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Simple naming: thermal_p{page}_img{index}.{ext}
            filename = f"thermal_p{page_index + 1}_img{img_index}.{image_ext}"
            filepath = os.path.join(assets_dir, filename)
            
            with open(filepath, "wb") as f:
                f.write(image_bytes)
                
            print(f"Saved: {filename}")
            extracted_count += 1
            
    print(f"Total extracted: {extracted_count}")

if __name__ == "__main__":
    extract_images()
