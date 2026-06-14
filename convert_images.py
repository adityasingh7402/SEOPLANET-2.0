import os
from PIL import Image

dirs = [
    r"c:\Users\yuppp\Desktop\SEOPLANET-2.0-main1\frontend\src\assets\team",
    r"c:\Users\yuppp\Desktop\SEOPLANET-2.0-main1\frontend\src\assets\work"
]

for d in dirs:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if filename.lower().endswith((".jpg", ".jpeg", ".png")):
            filepath = os.path.join(d, filename)
            img = Image.open(filepath)
            
            # Downscale massive images (some are 2.2MB, likely huge dimensions)
            img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            
            webp_path = os.path.splitext(filepath)[0] + ".webp"
            img.save(webp_path, "webp", quality=80)
            print(f"Converted {filename} to {os.path.basename(webp_path)}")
