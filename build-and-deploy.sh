#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a .nojekyll file to prevent GitHub Pages from using Jekyll
touch build/.nojekyll

echo "Build completed successfully!"
echo "To deploy to GitHub Pages:"
echo "1. Push the code to your GitHub repository"
echo "2. Enable GitHub Pages in your repository settings"
echo "3. Set the source to the 'gh-pages' branch"
echo "4. GitHub Actions will automatically deploy your site"
