# Imperial Aura Theme Guide

This document outlines the theme implementation for the Imperial Aura luxury clothing website, focusing on the purple, white, and black color scheme and design patterns used throughout the site.

## Color Palette

The theme uses a consistent color palette:

- **Primary Purple**: `#7928CA` - Used for primary buttons and main interactive elements
- **Primary Dark Purple**: `#5B21B6` - Used for hover states on primary elements
- **Secondary Purple**: `#9F7AEA` - Used for secondary elements and accents
- **Accent Purple**: `#8B5CF6` - Used for highlights and secondary interactive elements
- **White**: `#FFFFFF` - Main background color
- **Black**: `#000000` - Text color and footer/header backgrounds
- **Gray Light**: `#f8f8f8` - Alternate section backgrounds
- **Gray**: `#e0e0e0` - Borders and dividers

These colors are defined as CSS variables in `src/app/globals.css` and can be accessed using the `var(--primary)`, `var(--accent)`, etc. format.

## Component System

### Button Component

We've created a custom Button component to ensure consistent styling across the site. The Button component supports several variants:

- **Primary**: Purple background with white text
- **Secondary**: Lighter purple background with white text
- **Accent**: Accent purple background with white text
- **Outline**: Transparent background with purple border and text

Usage example:

```tsx
import Button from '../../components/ui/Button';

// Primary button (default)
<Button href="/collections">View Collections</Button>

// Accent button
<Button variant="accent" onClick={handleClick}>Contact Us</Button>

// Outline button
<Button variant="outline" href="/about">About Us</Button>

// Full width button
<Button fullWidth={true} type="submit">Submit</Button>
```

### Form Elements

We have updated all form elements to match the purple theme for a consistent user experience:

#### Input Component

Input fields feature:
- Clean borders with subtle shadows
- Purple focus ring and border highlight
- Smooth hover state transitions
- Purple text selection

```tsx
import { Input } from '../../components/ui/input';

<Input type="text" placeholder="Enter your name" />
<Input type="email" placeholder="Enter your email" required />
```

#### Textarea Component 

Textareas match inputs with:
- Consistent styling with input fields
- Purple focus states
- Clean transitions
- Flexible height

```tsx
import { Textarea } from '../../components/ui/textarea';

<Textarea placeholder="Enter your message" rows={4} />
```

#### Label Component

Labels provide clear context for form elements:
- Consistent text styling
- Purple highlight when associated input is focused
- Clear error states

```tsx
import { Label } from '../../components/ui/label';

<Label htmlFor="name">Your Name</Label>
<Input id="name" type="text" />
```

### Section Styling

Sections throughout the site follow these patterns:

1. **Alternating Backgrounds**: Sections alternate between white (`#FFFFFF`) and light gray (`#f8f8f8`) backgrounds
2. **Title Styling**: Section titles use the following pattern:
   - Text is black, font size is 3xl (30px)
   - Decorative purple accent line underneath (20px width, 4px height)
   - Example in `ProductGrid` component

3. **Content Layout**: 
   - Homepage collection sections alternate between left/right layout for images and text
   - On mobile, the image always appears first, followed by text
   - On desktop (md breakpoint and above), images and text alternate sides

## Design Patterns

### Interactive Elements

1. **Buttons**:
   - Use the custom Button component for consistency
   - Hover effects transition to slightly darker purple
   - Consistent padding (px-6 py-3)
   - Medium font weight for readability

2. **Links**:
   - Text links use hover effects to change to our accent purple
   - Ensure sufficient contrast between link and background

3. **Product Cards**:
   - White background with subtle shadow
   - Shadow increases on hover
   - Images scale slightly on hover (5% larger)
   - Clear call to action buttons

4. **Form Elements**:
   - Consistent purple focus states
   - Clean transitions on interaction
   - Clear error states using destructive color
   - Proper spacing and alignment

### Header & Footer

- Black background for strong contrast
- White text for readability
- Purple accent colors for interactive elements
- Purple accent for contact info icons

## Best Practices

1. **Always use the custom Button component** for interactive elements that lead to actions
2. **Maintain the alternating section pattern** on landing pages for consistent visual rhythm
3. **Use decorative purple accent lines** under important section titles
4. **Ensure text on colored backgrounds** has sufficient contrast (WCAG AA minimum)
5. **Keep dark text on light backgrounds** for maximum readability
6. **Apply hover effects** consistently for interactive elements
7. **Use the provided form components** for all user input fields

## Completed Implementation

1. ✅ Color variables in globals.css with purple/black/white scheme
2. ✅ Header component with black background and purple accents
3. ✅ Footer component with black background and purple accents
4. ✅ Cart component with theme-matching styles
5. ✅ Homepage with vertically stacked sections and alternating content
6. ✅ Hero component with purple accents and hover effects
7. ✅ ProductCard component with consistent purple theme
8. ✅ ProductGrid component with decorative purple accent line
9. ✅ Button component with various theme-consistent variants
10. ✅ Input component with purple focus states
11. ✅ Textarea component matching the input style
12. ✅ Label component with interactive states

## Known Issues & Future Improvements

1. Consider adding subtle animation effects using Framer Motion
2. Enhance site performance with image optimization techniques
3. Implement server-side rendering for key product pages 