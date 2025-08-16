# Vakil Tech Frontend

A modern legal services platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bmad/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: Geist Sans

## 📁 Project Structure

```
src/
├── app/                 # App Router pages and layouts
│   ├── globals.css     # Global styles and Tailwind directives
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── shared/        # Shared components (Header, Footer, etc.)
│   └── features/      # Feature-specific components
├── lib/               # Utilities and helpers
│   └── utils.ts       # Common utility functions
├── services/          # API service functions
└── types/             # TypeScript type definitions
```

## 🎨 Design System

The project uses a custom design system built on shadcn/ui with:

- **Primary Color**: Red accent theme
- **Typography**: Geist Sans as the primary font
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable UI components following design patterns

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Development Guidelines

### Component Standards

- Use TypeScript for all components
- Follow kebab-case for file names
- Use PascalCase for component names
- Implement proper prop interfaces
- Use React.forwardRef for components that need ref forwarding

### Styling Guidelines

- Use Tailwind CSS utility classes
- Leverage CSS custom properties for theming
- Follow mobile-first responsive design
- Use semantic color tokens (primary, secondary, etc.)

### Code Quality

- ESLint is configured for code quality
- TypeScript strict mode enabled
- Follow Next.js 15 best practices
- Use proper TypeScript types

## 🚀 Deployment

The project is configured for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

## 📄 License

This project is part of the Vakil Tech platform.

## 🤝 Contributing

1. Follow the established coding standards
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## Analytics Setup (Google Analytics 4)

To enable analytics, add the following to your .env.local file:

NEXT_PUBLIC_ANALYTICS_ID=your-ga4-measurement-id
ANALYTICS_PROVIDER=google-analytics-4

Replace `your-ga4-measurement-id` with your Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX).

## Analytics Debugging & Testing Utilities

- Analytics runs in debug mode automatically in development (not in production).
- All analytics events and errors are logged to the browser console when debug mode is active.
- You can trigger a test event from any component using the `testEvent` function from the `useAnalytics` hook:

```js
import { useAnalytics } from '@/hooks/use-analytics';
const { testEvent, debug } = useAnalytics();
if (debug) testEvent();
```

- Use this to verify analytics integration during development.
