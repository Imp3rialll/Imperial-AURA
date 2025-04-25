const fs = require('fs');
const path = require('path');

// Path to the navbar component file
const filePath = path.resolve('./src/components/ui/resizable-navbar.tsx');

try {
  // Read the file content
  console.log('Reading file:', filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Look for the background overlay section
  const lines = content.split('\n');
  let startLine = -1;
  let endLine = -1;
  
  // Find the start and end lines
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Background overlay for better visibility on mobile')) {
      startLine = i - 1; // Include the line with the comment
    }
    if (startLine !== -1 && lines[i].includes('</div>') && lines[i+1] && lines[i+1].includes(')}')) {
      endLine = i + 1;
      break;
    }
  }
  
  // Remove the overlay if found
  if (startLine !== -1 && endLine !== -1) {
    console.log(`Removing overlay from line ${startLine} to ${endLine}`);
    const updatedLines = [
      ...lines.slice(0, startLine),
      ...lines.slice(endLine + 1)
    ];
    
    // Write back to file
    fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
    console.log('Successfully removed the background overlay.');
  } else {
    console.log('Could not find background overlay section.');
  }
} catch (error) {
  console.error('Error updating the navbar component:', error);
} 