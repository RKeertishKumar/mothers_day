#!/bin/bash

# Create directories if they don't exist
mkdir -p static/images/nature
mkdir -p static/images/love
mkdir -p static/images/cultural
mkdir -p static/images/family
mkdir -p static/images/cooking

# Download nature images
curl -o static/images/nature/nature1.jpg https://via.placeholder.com/600x400/e6f7ff/0066cc?text=Nature+1
curl -o static/images/nature/nature2.jpg https://via.placeholder.com/600x400/e6f7ff/0066cc?text=Nature+2
curl -o static/images/nature/nature3.jpg https://via.placeholder.com/600x400/e6f7ff/0066cc?text=Nature+3
curl -o static/images/nature/nature4.jpg https://via.placeholder.com/600x400/e6f7ff/0066cc?text=Nature+4

# Download love images
curl -o static/images/love/love1.jpg https://via.placeholder.com/600x400/ffe6e6/cc0066?text=Love+1
curl -o static/images/love/love2.jpg https://via.placeholder.com/600x400/ffe6e6/cc0066?text=Love+2

# Download cultural images
curl -o static/images/cultural/cultural1.jpg https://via.placeholder.com/600x400/e6f9ff/0066cc?text=Cultural+1
curl -o static/images/cultural/cultural2.jpg https://via.placeholder.com/600x400/e6f9ff/0066cc?text=Cultural+2
curl -o static/images/cultural/cultural3.jpg https://via.placeholder.com/600x400/e6f9ff/0066cc?text=Cultural+3

# Download family images
curl -o static/images/family/family1.jpg https://via.placeholder.com/600x400/f0e6ff/6600cc?text=Family+1
curl -o static/images/family/family2.jpg https://via.placeholder.com/600x400/f0e6ff/6600cc?text=Family+2
curl -o static/images/family/family3.jpg https://via.placeholder.com/600x400/f0e6ff/6600cc?text=Family+3

# Download cooking images
curl -o static/images/cooking/chicken-curry.jpg https://via.placeholder.com/800x600/fff0e6/cc6600?text=Chicken+Curry

echo "All images downloaded successfully!"
