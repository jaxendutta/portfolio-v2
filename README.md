# Portfolio V2: Modern React Implementation

A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS 4.1. This project represents a complete migration from the vanilla JavaScript implementation to a modern React architecture.

## Live Demo

[Visit the Live Site](https://v2.anirban.ca)

## Features

- **Modern React Architecture** - Built with React 19 and Next.js 15
- **Responsive Design** - Fully responsive across all device sizes
- **Dark/Light Theme** - Toggle between dark and light modes with smooth transitions
- **Interactive Sections**:
  - Dynamic project showcase with filtering capabilities
  - Expandable work experience timeline
  - Contact form with email integration
- **Animations** - Smooth scrolling, transitions, and animations using Framer Motion
- **Horizontal Scrolling** - Desktop views feature horizontal scrolling for project details
- **Type-Safe** - Fully typed with TypeScript
- **Optimized Assets** - Images and assets are optimized for performance
- **SEO Friendly** - SEO optimized with proper meta tags
- **Accessibility** - WCAG compliant design and implementation

## Technology Stack

- **Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS 4.1
  - Framer Motion
  - React Icons

- **Backend/API**:
  - Next.js Server Actions
  - Resend for email handling

- **Development Tools**:
  - ESLint
  - Prettier
  - TurboRepo

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── app/          # App router pages and layouts
│   ├── components/   # React components
│   │   ├── emails/   # Email templates
│   │   ├── layout/   # Layout components
│   │   ├── sections/ # Page sections
│   │   ├── theme/    # Theme components
│   │   └── ui/       # Reusable UI components
│   ├── data/         # Data files (projects, work experience)
│   ├── lib/          # Utility functions and hooks
│   ├── styles/       # Global styles
│   └── types/        # TypeScript type definitions
├── next.config.ts    # Next.js configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-v2.git
cd portfolio-v2
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```
RESEND_API_KEY=your_resend_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The site will be available at `http://localhost:3000`

## Development Workflow

- **Development**: `npm run dev` - Starts the development server with hot reloading
- **Type checking**: `npm run typecheck` - Checks TypeScript types
- **Linting**: `npm run lint` - Runs ESLint
- **Building**: `npm run build` - Creates an optimized production build
- **Starting**: `npm run start` - Starts the production build locally

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in the Vercel dashboard
3. Deploy

For other platforms, ensure that you:
1. Build the project with `npm run build`
2. Set the necessary environment variables
3. Deploy the `.next` folder

## Migrated Features

This project is a migration from a vanilla JavaScript implementation to a modern React architecture. Key improvements include:

- **Component-Based Architecture**: Replaced monolithic JavaScript files with reusable React components
- **Enhanced State Management**: Implemented React hooks and context for state management
- **Server Components**: Utilized Next.js server components where appropriate
- **Improved Animations**: Replaced custom animation code with Framer Motion
- **Type Safety**: Added TypeScript typing throughout the application
- **Modern Styling**: Migrated from custom CSS to Tailwind CSS
