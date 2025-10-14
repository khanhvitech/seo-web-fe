# SEO Pilot - Content Management System

A comprehensive SEO and content management system built with React, TypeScript, and Vite.

## Features

- ✅ Content Management System with 8 sections
- ✅ Website Management with health monitoring
- ✅ 3-step wizard for website setup
- ✅ Multi-platform support (WordPress, Blogger, Joomla, Medium, Drupal)
- ✅ Modern UI with Shadcn/ui components
- ✅ Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Shadcn/ui, Radix UI, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query
- **Routing**: Wouter

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the following build settings:
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

3. Environment variables needed:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: Secret for session management

### Manual Deployment

```bash
# Build the application
npm run build:client

# The built files will be in client/dist/
```

## Project Structure

```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── types/       # TypeScript type definitions
│   │   └── lib/         # Utilities and configurations
├── server/           # Backend Express application
├── shared/           # Shared types and schemas
└── dist/             # Build output
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
