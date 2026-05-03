import requests
from PIL import Image
from io import BytesIO
import math

url = "https://i.ibb.co/v4B1kkSd/remove-background-2-K-202605040027.jpg"
response = requests.get(url)
img = Image.open(BytesIO(response.content))
img = img.convert("RGBA")

datas = img.getdata()
newData = []

# Better anti-aliasing background removal:
# We know the background is white (255, 255, 255).
# If a pixel is white, it becomes fully transparent.
# If a pixel is slightly gray/gold mixed with white (anti-aliasing edge),
# we adjust its alpha based on how close it is to white,
# and recover the original gold color by un-mixing the white.

for item in datas:
    r, g, b, a = item
    
    # Calculate distance to pure white
    dist_to_white = math.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)
    
    if dist_to_white < 15:
        # Pure white or very close -> fully transparent
        newData.append((255, 255, 255, 0))
    elif dist_to_white < 120:
        # Edge pixels
        # Estimate alpha based on distance to white (closer to white = lower alpha)
        # alpha goes from 0 at dist=15 to 255 at dist=120
        alpha = int(((dist_to_white - 15) / 105.0) * 255)
        
        # Recover original color assuming it was blended with white
        # original_color = (current_color - white * (1 - alpha)) / alpha
        if alpha > 0:
            a_ratio = alpha / 255.0
            new_r = min(255, max(0, int((r - 255 * (1 - a_ratio)) / a_ratio)))
            new_g = min(255, max(0, int((g - 255 * (1 - a_ratio)) / a_ratio)))
            new_b = min(255, max(0, int((b - 255 * (1 - a_ratio)) / a_ratio)))
            newData.append((new_r, new_g, new_b, alpha))
        else:
            newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save("frontend/public/logo_transparent.png", "PNG")
print("Image saved to frontend/public/logo_transparent.png")
