# GauntletIn Folder Structure Guidelines

## Required Project Structure

The GauntletIn project follows this standardized folder structure. All new code must adhere to this organization:

```
src/
├── components/  # Reusable UI components organized by domain
│   ├── auth/       # Authentication related components
│   ├── profile/    # User profile components
│   ├── feed/       # Content feed components
│   ├── messaging/  # Messaging system components
│   ├── jobs/       # Job platform components
│   ├── network/    # Connection and networking components 
│   └── shared/     # Cross-cutting components used across domains
├── hooks/          # Custom React hooks
├── pages/          # Route-level components that compose page layouts
├── types/          # TypeScript definitions and interfaces
├── utils/          # Helper functions and utilities
├── lib/            # Third-party integrations
├── services/       # API services and data fetching
├── context/        # React Context providers
├── assets/         # Static assets (images, fonts, etc.)
└── styles/         # Global styles and theming
```

## Folder Rules

1. **Component Organization**
   - Group related components in domain-specific folders
   - Nested components should be placed in subdirectories
   - Shared components used across domains go in `components/shared/`

2. **File Placement**
   - Place each component in its own folder with associated files
   - Store hooks in the `hooks` directory, organized by feature
   - Keep route components in the `pages` directory
   - Domain-specific utilities should be in their respective domain folders

3. **Example Component Folder Structure**
```
src/components/profile/profile-card/
├── ProfileCard.tsx            # Main component
├── ProfileCard.module.css     # Component styles
├── ProfileCard.test.tsx       # Component tests
├── ProfileCardHeader.tsx      # Sub-component
└── ProfileCardActions.tsx     # Sub-component
```

4. **Import Rules**
   - Use relative imports for files within the same feature area
   - Use absolute imports from root for cross-domain imports
   - Configure path aliases for common imports (e.g., @components, @hooks) 