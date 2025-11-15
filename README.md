# Photographer Landing Page

A modern, professional landing page for photographers built with Next.js 15, TypeScript, SCSS, and Supabase.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **SCSS** for styling with modular components
- **Supabase** integration ready
- Responsive design
- Mobile-friendly navigation
- Professional header and footer components

## Project Structure

```
Photographer-landing-page/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   └── globals.scss        # Global styles
├── components/
│   ├── Header/
│   │   ├── index.tsx       # Header component
│   │   └── Header.module.scss
│   ├── Footer/
│   │   ├── index.tsx       # Footer component
│   │   └── Footer.module.scss
│   └── Main/
│       ├── index.tsx       # Main layout wrapper
│       └── Main.module.scss
├── lib/
│   └── supabase.ts         # Supabase client
├── types/
│   └── index.ts            # TypeScript types
├── styles/
│   ├── _variables.scss     # SCSS variables
│   └── _mixins.scss        # SCSS mixins
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Components

### Header
- Fixed navigation bar
- Mobile-responsive menu
- Active link highlighting
- Smooth scroll behavior

### Footer
- Brand information
- Quick links navigation
- Social media links
- Contact information
- Legal links

### Main
- Layout wrapper component
- Proper spacing for fixed header

## Styling

The project uses SCSS with:
- Modular component styles (CSS Modules)
- Global variables for colors, typography, spacing
- Reusable mixins for common patterns
- Mobile-first responsive design

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to `.env.local`

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

