import os
from PIL import Image

def optimize_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                try:
                    with Image.open(file_path) as img:
                        # Calculate new size maintaining aspect ratio
                        max_size = (1920, 1080)
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)
                        
                        # Convert to WebP
                        webp_path = os.path.splitext(file_path)[0] + '.webp'
                        img.save(webp_path, 'WEBP', quality=85, optimize=True)
                        
                        print(f"Optimized: {file} -> {os.path.basename(webp_path)}")
                        
                        # Remove original file if it's not the same as the new one (which it won't be due to extension)
                        # os.remove(file_path) # Commented out for safety, we will update code to use webp
                except Exception as e:
                    print(f"Error optimizing {file}: {e}")

if __name__ == "__main__":
    target_dir = "/home/ubuntu/spicy-nft-club-lp/client/public"
    optimize_images(target_dir)
