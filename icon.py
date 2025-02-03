from PIL import Image, ImageDraw

# Create a 128x128 icon
image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
draw = ImageDraw.Draw(image)
draw.ellipse((10, 10, 118, 118), fill='blue', outline='black')
draw.text((40, 50), "BN", fill="white")  # "BN" for Blind Navigator

# Save the icon
image.save('icons/icon128.png')

# Resize to 48x48 and 16x16
image.resize((48, 48)).save('icons/icon48.png')
image.resize((16, 16)).save('icons/icon16.png')