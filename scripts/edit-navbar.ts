import * as fs from 'fs';
import * as path from 'path';

// Path to the navbar component file
const filePath = path.resolve('src/components/ui/resizable-navbar.tsx');

try {
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');

  // Define the pattern to match the background overlay div
  const overlayPattern = /{\s*\/\*\s*Background overlay for better visibility on mobile.*?<\/div>\s*\)\s*}/s;

  // Replace the overlay with nothing
  const updatedContent = content.replace(overlayPattern, '');

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  console.log('Successfully removed the background overlay from the navbar component.');
} catch (error) {
  console.error('Error updating the navbar component:', error);
} 