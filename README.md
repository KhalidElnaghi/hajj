# Hajj Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.18-brightgreen.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)
![React](https://img.shields.io/badge/React-19.2-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

</div>

A comprehensive Next.js 16 control panel for managing the Hajj pilgrimage operations. It delivers a responsive, multilingual admin experience with role-aware navigation, KPI dashboards, data visualizations, PDF exports, and advanced management tools for pilgrims, accommodations, transportation, healthcare, and supervisors. Built with MUI, React Query, and Emotion.

**Author:** [KhalidElnaghi](https://github.com/KhalidElnaghi)

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Setup](#setup)
6. [Environment Variables](#environment-variables)
7. [Scripts](#scripts)
8. [Development Workflow](#development-workflow)
9. [Internationalization](#internationalization)
10. [API & Codegen](#api--codegen)
11. [Deployment](#deployment)
12. [Code Quality & Standards](#code-quality--standards)
13. [Architecture Overview](#architecture-overview)
14. [Troubleshooting](#troubleshooting)
15. [Contributing](#contributing)
16. [License](#license)

## Features

### 🔐 Authentication & Security

- JWT-based authentication flows with protected layouts and guards
- Role-based access control and permission management
- Secure server actions and API integration

### 📊 Dashboards & Analytics

- KPI-focused dashboards with real-time data
- Tabular views with advanced sorting and filtering
- Export-ready PDF/CSV actions for reports
- Interactive charts powered by ApexCharts

### 🎨 Design & UX

- Responsive design system built with Material UI 7
- Custom theming with light/dark mode support
- Full RTL (Right-to-Left) support for Arabic
- Smooth animations with Framer Motion
- Custom branded theming tokens

### 🌍 Internationalization

- Multi-language support (Arabic & English)
- Automatic locale detection from cookies and Accept-Language
- JSON-based message catalogs
- Date and number formatting per locale

### 🔄 Real-time Features

- Live updates via SignalR/Socket.IO integration
- Optimistic UI updates with React Query caching
- Real-time notifications and alerts

### 🗺️ Geolocation & Maps

- Interactive map experiences powered by Google Maps APIs
- Reusable geolocation hooks
- Location-based pilgrim tracking
- Accommodation and transportation mapping

### 🛠️ Developer Experience

- TypeScript strict mode for type safety
- Build-time SVG/asset optimization
- Code generation from OpenAPI specifications
- Hot module replacement for faster development
- ESLint + Prettier for code quality

## Tech Stack

| Layer        | Tools                                                            |
| ------------ | ---------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router) + React 19 + TypeScript 5.9              |
| UI / UX      | MUI 7, Emotion, Framer Motion, ApexCharts, React Slick           |
| Data & State | TanStack Query 5, React Hook Form, Yup, Lodash                   |
| Auth & APIs  | JWT utilities, Axios client, next-intl middleware, SignalR       |
| Tooling      | pnpm, ESLint + Prettier, TypeScript strict mode, OpenAPI codegen |

## Project Structure

```
src/
├── app/               # App Router layouts, pages, and API routes
├── actions/           # Server actions (auth, lookup data, React Query provider)
├── components/        # Reusable UI pieces (forms, tables, charts, steppers)
├── layouts/           # Auth, dashboard, and main shell compositions
├── sections/          # Feature-specific UI modules (auth, countries, stats)
├── theme/             # Palette, typography, shadows, overrides for MUI
├── i18n/ & messages/  # next-intl config and locale dictionaries
├── hooks/             # Custom hooks (auth, responsive, geolocation, storage)
├── utils/             # API helpers, formatting, storage, PDF builder
└── types/             # Shared TypeScript types and schemas
```

Additional assets live in `public/` (logos, fonts, SVG icons) and `messages/` (per-locale JSON bundles).

## Prerequisites

- Node.js **18.18+** (LTS recommended).
- [pnpm](https://pnpm.io/) **>= 8** (repo ships with `pnpm-lock.yaml`).
- Google Maps API access (for map widgets) and backend API credentials.

## Setup

```bash
# clone the repository
git clone <repo-url> && cd hajj-management-system

# install dependencies
pnpm install

# copy environment template
cp .env.example .env.local   # create this file if it does not exist

# start the dev server (http://localhost:4002)
pnpm dev
```

> The dev script forces webpack mode on port **4002** (`next dev --webpack -p 4002`). Production builds run on port **4000** by default.

## Environment Variables

| Variable                         | Required | Description                                                 |
| -------------------------------- | -------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_HOST_API`           | ✅       | Primary REST API base URL used across the dashboard.        |
| `NEXT_PUBLIC_HOST_API_SHARED`    | ✅       | Shared services API (used by `src/config-global.ts`).       |
| `NEXT_PUBLIC_ASSETS_API`         | ✅       | Static assets/CDN host for media and documents.             |
| `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` | Optional | Enables map widgets and geolocation helpers.                |
| `ORUFY_API_KEY`                  | Optional | Required for `app/api/orufy/*` server routes.               |
| `IMAGE_DOMAIN`                   | Optional | Enables remote image loading in `next.config.js`.           |
| `HOST_API`                       | Optional | Mirrors `NEXT_PUBLIC_HOST_API` for backwards compatibility. |

Create `.env.local` (ignored by Git) and restart the dev server after any change.

## Scripts

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `pnpm dev`      | Run the Next.js dev server on port 4002 with webpack.      |
| `pnpm dev:ts`   | Run dev server and TypeScript watch mode simultaneously.   |
| `pnpm build`    | Create an optimized production build.                      |
| `pnpm start`    | Serve the production build on port 4000.                   |
| `pnpm lint`     | Lint TypeScript/JS files with ESLint.                      |
| `pnpm lint:fix` | Automatically fix linting issues.                          |
| `pnpm ts`       | Run TypeScript type-checking without emitting output.      |
| `pnpm ts:watch` | Run TypeScript in watch mode for continuous type-checking. |
| `pnpm prettier` | Format source files with Prettier.                         |
| `pnpm openapi`  | Generate typed React Query clients from `openapi.yaml`.    |
| `pnpm rm:all`   | Clean all build artifacts and dependencies.                |
| `pnpm re:start` | Clean install and start dev server (full reset).           |
| `pnpm re:build` | Clean install and create production build.                 |

## Development Workflow

### Initial Setup

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure Environment Variables**:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   Navigate to `http://localhost:4002`

### Daily Development Cycle

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
pnpm install

# 3. Start dev server with TypeScript checking
pnpm dev:ts

# 4. Make your changes...

# 5. Before committing, run quality checks
pnpm lint:fix       # Fix linting issues
pnpm ts             # Check types
pnpm prettier       # Format code

# 6. Commit and push
git add .
git commit -m "feat: your feature description"
git push
```

### Working with APIs

When backend API changes:

```bash
# 1. Get updated openapi.yaml from backend team
# 2. Generate new API clients
pnpm openapi

# 3. Update imports if needed
# 4. Run TypeScript to catch breaking changes
pnpm ts
```

### Debugging Tips

1. **React Query Devtools**:
   - Available in development mode
   - Toggle with floating button in bottom-right
   - Inspect query cache, states, and timings

2. **Next.js Dev Tools**:
   - View component tree in browser DevTools
   - Check server vs client component boundaries
   - Monitor hydration errors

3. **Browser Console**:
   - API requests logged in development
   - Redux DevTools for state inspection
   - Network tab for request/response debugging

4. **VS Code Extensions** (recommended):
   - ESLint
   - Prettier
   - Error Lens
   - TypeScript Error Translator
   - GitLens

### Creating New Features

1. **Create Feature Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Add Components**:
   - Place in appropriate section folder (`src/sections/`)
   - Create reusable components in `src/components/`
   - Add types in `src/types/`

3. **Add Routes**:
   - Create page in `src/app/[locale]/your-route/page.tsx`
   - Update `src/routes/paths.ts` if needed
   - Add navigation items if applicable

4. **Add Translations**:
   - Update `messages/en.json`
   - Update `messages/ar.json`
   - Use `useTranslate` hook in components

5. **Test Your Feature**:
   - Test in both English and Arabic
   - Test on mobile and desktop
   - Test with different user roles
   - Verify real-time updates work

6. **Quality Checks**:
   ```bash
   pnpm lint:fix
   pnpm ts
   pnpm prettier
   ```

### Common Development Tasks

#### Adding a New Form

1. Create Yup schema in component
2. Use `react-hook-form` with resolver
3. Add form fields from `src/components/hook-form/`
4. Implement submit handler with React Query mutation
5. Add success/error notifications

#### Adding a New Table

1. Use `CustomSharedTable` component
2. Define columns with type safety
3. Add filters and search
4. Implement export functionality if needed
5. Add pagination and sorting

#### Adding Translations

```bash
# Add keys to both locale files
# English
messages/en.json: { "key": "English text" }

# Arabic
messages/ar.json: { "key": "النص العربي" }

# Use in component
const { t } = useTranslate();
<Typography>{t('key')}</Typography>
```

#### Styling Components

```tsx
// Use MUI sx prop
<Box sx={{ p: 2, bgcolor: 'background.paper' }}>

// Use theme tokens
import { useTheme } from '@mui/material';
const theme = useTheme();

// Custom styles with Emotion
import { styled } from '@mui/material/styles';
const CustomBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
```

### Asset Management

- **Icons**: Use `@iconify/react` for consistent icon library
- **Images**: Place in `public/assets/images/`
- **Fonts**: Add to `public/fonts/` and update `public/fonts/index.css`
- **SVGs**: Place in `public/assets/icons/` for direct import
- **Logos**: Use from `public/logo/`

### Commit Conventions

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:

```bash
git commit -m "feat: add pilgrim health status dashboard"
git commit -m "fix: resolve RTL layout issue in navigation"
git commit -m "docs: update API integration guide"
```

## Internationalization

- `next-intl` middleware auto-detects locale from cookies and `Accept-Language`.
- Localized strings live in `messages/<locale>.json`.
- To add a new language:
  1. Add the locale to `src/i18n/routing.ts`.
  2. Create `messages/<locale>.json`.
  3. Update any locale-specific assets if necessary.
- Use the `useTranslate` hook (`src/locales/use-translate.ts`) inside components.

## API & Codegen

### API Architecture

The application uses a multi-layered API architecture:

1. **Axios Client** (`src/utils/axios.ts`):
   - Base HTTP client with interceptors
   - Automatic JWT token injection
   - Error handling and request/response transformation
   - Request/response logging in development

2. **CRUD Utilities** (`src/utils/crud-fetch-api.ts`):
   - Generic CRUD operations (Create, Read, Update, Delete)
   - Consistent error handling
   - Type-safe request/response handling

3. **Server Actions** (`src/actions/*`):
   - Centralized auth operations
   - Lookup data fetching
   - React Query configuration and caching strategies
   - Server-side data mutations

4. **API Routes** (`app/api/*`):
   - Edge/serverless functions
   - Auth endpoints
   - Third-party integrations (Orufy, etc.)
   - Webhook handlers

### OpenAPI Code Generation

This project uses automated code generation from OpenAPI specifications:

```bash
# Generate React Query hooks from openapi.yaml
pnpm openapi
```

**Benefits**:

- Type-safe API calls
- Automatic request/response typing
- Consistent error handling
- Reduced boilerplate code
- API documentation in sync with code

**Workflow**:

1. Backend team updates `openapi.yaml`
2. Run `pnpm openapi` to regenerate clients
3. Update components to use new API types
4. TypeScript will catch any breaking changes

### File Uploads

Static files and uploads are proxied through `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/uploads/:path*",
      "destination": "http://156.67.27.191:8001/uploads/:path*"
    }
  ]
}
```

This ensures seamless access to uploaded files without CORS issues.

## Deployment

### Pre-deployment Checklist

Before deploying to production:

- [ ] Run `pnpm lint` and fix all errors
- [ ] Run `pnpm ts` to verify type safety
- [ ] Test `pnpm build` locally to catch build issues
- [ ] Verify all environment variables are documented
- [ ] Test the production build locally with `pnpm start`
- [ ] Ensure API endpoints are accessible from production domain
- [ ] Verify CORS settings on backend allow production domain
- [ ] Test authentication flow end-to-end
- [ ] Check that file uploads work correctly

### Deployment Platforms

#### Vercel (Recommended)

1. **Connect Repository**:
   - Link GitHub repository to Vercel
   - Vercel auto-detects Next.js configuration

2. **Configure Environment**:
   - Add all `NEXT_PUBLIC_*` variables in Vercel dashboard
   - Set `NODE_ENV=production`
   - Configure build settings (usually auto-detected)

3. **Deploy**:

   ```bash
   # Automatic deployment on git push
   git push origin main
   ```

4. **Custom Configuration**:
   - `vercel.json` handles rewrites for uploads
   - Edge functions run globally for low latency

#### Docker Deployment

1. **Create Dockerfile**:

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install -g pnpm
   RUN pnpm install
   COPY . .
   RUN pnpm build
   EXPOSE 4000
   CMD ["pnpm", "start"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t hajj-management .
   docker run -p 4000:4000 --env-file .env.local hajj-management
   ```

#### Manual Server Deployment

1. **Build the Application**:

   ```bash
   pnpm install --frozen-lockfile
   pnpm build
   ```

2. **Configure Environment**:
   - Set all required environment variables
   - Ensure Node.js 18.18+ is installed

3. **Run with PM2** (process manager):

   ```bash
   npm install -g pm2
   pm2 start npm --name "hajj-system" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Reverse Proxy** (nginx example):

   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:4000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

### Post-deployment Verification

After deployment:

1. **Test Core Functionality**:
   - Login/logout flow
   - Dashboard loads correctly
   - Real-time features work
   - Maps display properly
   - File uploads/downloads work

2. **Monitor Performance**:
   - Check response times
   - Verify CDN is caching static assets
   - Monitor server resources

3. **Check Logs**:
   - Review application logs for errors
   - Monitor API error rates
   - Check for failed authentication attempts

### Environment-specific Notes

- **Production**: Ensure `uploads` rewrite target (`http://156.67.27.191:8001`) is reachable
- **Staging**: Use separate API endpoints and database
- **Development**: Use local API or development backend

## Code Quality & Standards

### Linting & Formatting

This project enforces strict code quality standards:

- **ESLint**: Custom configuration with TypeScript, React, and Prettier integration
- **Prettier**: Automated code formatting on save
- **TypeScript**: Strict mode enabled for maximum type safety
- **Import sorting**: Automatic import organization with `eslint-plugin-perfectionist`
- **Unused imports**: Detection and removal with `eslint-plugin-unused-imports`

### Pre-commit Checks

Before committing code:

```bash
# Check for linting errors
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Verify TypeScript types
pnpm ts

# Format code
pnpm prettier
```

### Code Conventions

- Use **functional components** with hooks over class components
- Prefer **async/await** for asynchronous operations
- Use **descriptive variable names** with auxiliary verbs (e.g., `is_active`, `has_permission`)
- Keep components **small and focused** (single responsibility)
- Extract **reusable logic** into custom hooks
- Use **TypeScript interfaces** for all props and state
- Follow **Next.js App Router** conventions for file structure

## Architecture Overview

### Key Architectural Decisions

1. **Next.js App Router**: Server and client components for optimal performance
2. **React Query**: Centralized data fetching, caching, and state management
3. **Server Actions**: Secure server-side operations without API routes
4. **JWT Authentication**: Stateless authentication with secure token storage
5. **Modular Design**: Feature-based folder structure for scalability
6. **Type Safety**: End-to-end TypeScript coverage with OpenAPI codegen

### Data Flow

```
User Action → React Component → React Query Hook → Axios Client → Backend API
                     ↓                                                  ↓
              UI Update ← Cache Update ← Query Invalidation ← API Response
```

### State Management Strategy

- **Server State**: React Query (API data, caching, synchronization)
- **Client State**: React hooks (UI state, forms, temporary data)
- **URL State**: Next.js routing and search params
- **Persistent State**: Local storage (theme, language, user preferences)

## Troubleshooting

### Common Issues

#### Missing Environment Variables

**Symptom**: The app fails to fetch data or displays connection errors.

**Solution**:

```bash
# Verify .env.local exists and contains required variables
cat .env.local

# Restart dev server after adding variables
pnpm dev
```

#### Asset Domains Blocked

**Symptom**: Images don't load or show broken image icons.

**Solution**:

- Set `IMAGE_DOMAIN` in `.env.local` to allow remote images
- Update `next.config.js` with the correct domain pattern
- Clear Next.js cache: `rm -rf .next`

#### Map Widgets Blank

**Symptom**: Google Maps components render empty or show errors.

**Solution**:

1. Verify `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` is set correctly
2. Check Google Cloud Console for API enablement
3. Ensure billing is enabled on your Google Cloud project
4. Verify API restrictions allow your domain

#### Socket/SignalR Connection Errors

**Symptom**: Real-time features don't work, console shows connection errors.

**Solution**:

- Verify `NEXT_PUBLIC_HOST_API` points to correct backend
- Check backend server is running and accessible
- Verify CORS settings on backend allow your domain
- Check firewall/network settings

#### SVG Import Issues

**Symptom**: SVG files fail to import or render incorrectly.

**Solution**:

```bash
# Restart dev server to reload webpack config
pnpm dev
```

#### TypeScript Errors After npm install

**Symptom**: False TypeScript errors or missing type definitions.

**Solution**:

```bash
# Clean and reinstall
pnpm re:start

# Or manually:
pnpm rm:all
pnpm install
pnpm dev
```

#### Build Fails in Production

**Symptom**: `pnpm build` fails with errors.

**Solution**:

1. Check all TypeScript errors: `pnpm ts`
2. Fix linting issues: `pnpm lint:fix`
3. Verify environment variables are set
4. Clear cache and rebuild: `pnpm re:build`

### Performance Issues

If experiencing slow load times:

1. **Check React Query devtools** for excessive refetching
2. **Optimize images** using Next.js Image component
3. **Enable production mode** for accurate performance testing
4. **Check network tab** for slow API requests
5. **Review bundle size** using Next.js build analyzer

## Contributing

We welcome contributions to improve the Hajj Management System! Here's how you can help:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run quality checks:
   ```bash
   pnpm lint:fix
   pnpm ts
   pnpm prettier
   ```
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Pull Request Guidelines

- Provide a clear description of the problem and solution
- Include screenshots for UI changes
- Update documentation if needed
- Ensure all tests pass and no linting errors
- Keep PRs focused on a single feature or fix
- Link related issues in the PR description

### Code Review Process

1. At least one maintainer review is required
2. All CI checks must pass
3. Code must follow project conventions
4. Documentation must be updated if applicable

## License

This project is **private** and proprietary. All rights reserved.

**© 2024 KhalidElnaghi**

Unauthorized copying, distribution, or modification of this software is strictly prohibited.

---

## Support & Contact

For questions, issues, or feature requests:

- **Author**: [KhalidElnaghi](https://github.com/KhalidElnaghi)
- **Issues**: Open an issue in the repository
- **Documentation**: Refer to this README and inline code comments

---

**Built with ❤️ using Next.js, React, and TypeScript**

Happy building! 🚀
