const fs = require('fs');
const path = require('path');

// Path to the navbar component file
const filePath = path.resolve('./src/components/ui/resizable-navbar.tsx');

try {
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if there's a syntax error by looking for <div className="relative"> without proper nesting
  const fixedContent = content.replace(
    /{\/\* Text animation with SVG outline effect \*\/\}\s+{\/\* Add defs with enhanced glow filter \*\/\}/s,
    '{/* Text animation with SVG outline effect */}\n        <div className="relative">\n          {/* Add defs with enhanced glow filter */}'
  );
  
  // Write the fixed content back to the file
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log('Successfully fixed the navbar component syntax.');
} catch (error) {
  console.error('Error fixing the navbar component:', error);
} 