# GauntletIn

A professional social networking platform built with Next.js 15 and React.

## Features

- **User Authentication**: Secure login and signup with email/password
- **Posting**: Create, like, and share posts with your network
- **Messaging**: Real-time chat functionality with colleagues
- **Job Listings**: Browse and apply for job opportunities
- **Profile Management**: Manage your professional profile

## Development Setup

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/gauntletin.git
   cd gauntletin
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Run the development server**
   ```
   npm run dev
   ```

4. **Build for production**
   ```
   npm run build
   ```

## Deployment

This project is configured for deployment on Vercel. The following files assist with the deployment process:

- `vercel.json` - Vercel deployment configuration
- `next.config.js` - Next.js build configuration

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # React components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries and services
├── styles/          # Global CSS styles
└── types/           # TypeScript type definitions
```

## Notes on Fixes

- ESLint issues have been resolved with proper disabling comments where necessary
- TypeScript typing has been improved throughout the codebase
- Mock authentication has been implemented for development purposes
- Build configuration has been optimized for deployment

## License

MIT
