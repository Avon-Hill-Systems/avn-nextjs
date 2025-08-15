# Black Hole Next.js

A modern, full-stack web application built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## 🚀 Features

- **Next.js 15** - Latest version with App Router and Turbopack
- **React 19** - Modern React with latest features and optimizations
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework with latest features
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting with Tailwind CSS plugin
- **pnpm** - Fast, disk space efficient package manager

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm
- **Linting**: ESLint + Next.js config
- **Formatting**: Prettier + Tailwind CSS plugin

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd black_hole-nextjs
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
black_hole-nextjs/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles with Tailwind CSS
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page component
│   └── components/          # Reusable components
│       └── Button.tsx       # Sample Button component
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json             # Project dependencies and scripts
```

## 🎨 Tailwind CSS

This project uses Tailwind CSS 4 with the new `@import "tailwindcss"` syntax. The configuration includes:

- Custom color variables for theming
- Responsive design utilities
- Dark mode support
- Custom font families

## 🔧 Configuration Files

- **`tailwind.config.ts`** - Tailwind CSS configuration with content paths and theme customization
- **`postcss.config.mjs`** - PostCSS configuration for Tailwind CSS processing
- **`.prettierrc`** - Prettier configuration with Tailwind CSS plugin
- **`tsconfig.json`** - TypeScript configuration with path aliases

## 🚀 Getting Started

1. **Create a new component**:
   ```tsx
   // src/components/MyComponent.tsx
   import React from 'react';
   
   interface MyComponentProps {
     title: string;
   }
   
   const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
     return (
       <div className="p-4 bg-white rounded-lg shadow">
         <h2 className="text-xl font-bold">{title}</h2>
       </div>
     );
   };
   
   export default MyComponent;
   ```

2. **Use Tailwind CSS classes**:
   ```tsx
   <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
     <h1 className="text-2xl font-bold">Hello World</h1>
     <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
       Click me
     </button>
   </div>
   ```

## 🌙 Dark Mode

The project includes built-in dark mode support using CSS variables and Tailwind CSS classes. Dark mode automatically adapts based on system preferences.

## 📱 Responsive Design

All components are built with responsive design in mind using Tailwind CSS responsive prefixes:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🔍 TypeScript

Full TypeScript support with:
- Strict type checking
- Path aliases (`@/*` points to `src/*`)
- Type definitions for all dependencies
- Custom type definitions for components

## 📝 Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Automatic code formatting with Tailwind CSS class sorting
- **TypeScript**: Strict type checking and compilation

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any platform supporting Node.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm format`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
3. Open an issue in the repository

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS
