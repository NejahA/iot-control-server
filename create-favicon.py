from PIL import Image, ImageDraw, ImageFont

# Create a simple server icon
size = 256
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw a globe/server icon
# Background circle
draw.ellipse([20, 20, size-20, size-20], fill='#667eea')

# Draw grid lines for globe effect
for i in range(3):
    y = 40 + i * 60
    draw.ellipse([40, y, size-40, y+40], outline='white', width=3)

# Vertical lines
for i in range(3):
    x = 60 + i * 60
    draw.line([(x, 40), (x, size-40)], fill='white', width=3)

# Save as PNG
img.save('public/favicon.png', 'PNG')
print("Favicon created: public/favicon.png")
