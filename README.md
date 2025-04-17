# Imperial Aura Luxury Clothing Store

Imperial Aura is a modern luxury clothing brand website with a purple/black theme, featuring a sticky navbar and a fully functional shopping cart system.

## Features

- **Modern Design**: Sleek purple and black color scheme with elegant typography
- **Collection Landing Pages**: Dedicated pages for Engine Heads, Structured, Embroidered, Lowers, and Animex collections
- **SEO Optimized**: Meta tags and structured data for improved search visibility
- **Performance Focused**: Fast-loading images and optimized code
- **Responsive Design**: Fully adaptable to desktop, tablet, and mobile devices
- **Shopping Cart**: Persistent cart with localStorage for saving items

## Technical Implementation

- Built with **Next.js 15** and **React 19**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- Modular architecture with reusable components
- Client-side state management for cart functionality
- Incremental Static Regeneration (ISR) for product pages

## Directory Structure

```
.
├── components/            # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer, Cart)
│   └── sections/          # Page sections (Hero, ProductGrid, etc.)
├── lib/                   # Utilities and context providers
│   ├── CartContext.tsx    # Shopping cart context and state management
│   └── dummyData.ts       # Placeholder product data
├── public/                # Static assets
│   └── images/            # Image placeholders and assets
└── src/                   # Source code
    └── app/               # Next.js app directory
        ├── page.tsx       # Homepage
        ├── engine-heads/  # Engine Heads collection page
        ├── structured/    # Structured collection page
        ├── embroidered/   # Embroidered collection page
        ├── lowers/        # Lowers collection page
        ├── animex/        # Animex collection page
        └── contact/       # Contact page
```

## SEO Strategy

- **Meta Tags**: Customized titles, descriptions, and keywords for each page
- **Structured Data**: Product information with schema markup
- **Optimized Images**: Alt tags and semantic HTML
- **Mobile-Friendly**: Responsive design for all devices
- **Performance**: Fast loading with Core Web Vitals in mind

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/imperialaura.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contact

Imperial Aura - [contact@imperialaura.com](mailto:contact@imperialaura.com)

## License

This project is proprietary and confidential. All rights reserved.
