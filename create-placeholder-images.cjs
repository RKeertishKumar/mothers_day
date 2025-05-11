// Script to create placeholder images in the static directory

const fs = require('fs');
const path = require('path');

// Ensure directories exist
const directories = [
  'static/images/nature',
  'static/images/love',
  'static/images/cultural',
  'static/images/family',
  'static/images/cooking'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create a simple SVG placeholder image
function createSvgPlaceholder(text, bgColor, textColor) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="${bgColor}"/>
  <text x="300" y="200" font-family="Arial" font-size="36" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>
  `.trim();
}

// Create placeholder images
const placeholders = [
  { path: 'static/images/nature/nature1.jpg', text: "Nature's Beauty", bgColor: '#e6f7ff', textColor: '#0066cc' },
  { path: 'static/images/nature/nature2.jpg', text: "Nature's Gifts", bgColor: '#e6f7ff', textColor: '#0066cc' },
  { path: 'static/images/nature/nature3.jpg', text: 'Love For Nature', bgColor: '#e6f7ff', textColor: '#0066cc' },
  { path: 'static/images/nature/nature4.jpg', text: 'Peaceful Nature', bgColor: '#e6f7ff', textColor: '#0066cc' },
  
  { path: 'static/images/love/love1.jpg', text: 'Shades Of Present Love', bgColor: '#ffe6e6', textColor: '#cc0066' },
  { path: 'static/images/love/love2.jpg', text: 'Love In Digital Age', bgColor: '#ffe6e6', textColor: '#cc0066' },
  
  { path: 'static/images/cultural/cultural1.jpg', text: 'New Year In India', bgColor: '#e6f9ff', textColor: '#0066cc' },
  { path: 'static/images/cultural/cultural2.jpg', text: 'One Year In Poem', bgColor: '#e6f9ff', textColor: '#0066cc' },
  { path: 'static/images/cultural/cultural3.jpg', text: "Jhansi Rani's Story", bgColor: '#e6f9ff', textColor: '#0066cc' },
  
  { path: 'static/images/family/family1.jpg', text: 'Dream - Child To Be A Doctor', bgColor: '#f0e6ff', textColor: '#6600cc' },
  { path: 'static/images/family/family2.jpg', text: "Deepa's Marriage", bgColor: '#f0e6ff', textColor: '#6600cc' },
  { path: 'static/images/family/family3.jpg', text: 'Parents Support For Hanita', bgColor: '#f0e6ff', textColor: '#6600cc' },
  
  { path: 'static/images/cooking/chicken-curry.jpg', text: 'Chicken Curry', bgColor: '#fff0e6', textColor: '#cc6600' }
];

// Write SVG files
placeholders.forEach(item => {
  const svg = createSvgPlaceholder(item.text, item.bgColor, item.textColor);
  fs.writeFileSync(item.path, svg);
  console.log(`Created placeholder image: ${item.path}`);
});

console.log('All placeholder images created successfully!');
