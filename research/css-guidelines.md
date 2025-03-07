# GauntletIn CSS & Styling Guidelines

## CSS Organization

### File Structure

1. **CSS Modules**
   - One CSS Module file per component: `ComponentName.module.css`
   - Place in the same directory as the component
   - Name should match component file name

2. **Global Styles**
   - Global styles in `src/styles/` directory
   - Design tokens in `src/styles/tokens.ts`
   - Global CSS variables in `src/styles/variables.css`
   - Reset/normalize styles in `src/styles/reset.css`

### CSS Rules Organization

Organize CSS properties in this order:

```css
.selector {
  /* Layout Properties */
  display: flex;
  position: relative;
  width: 100%;
  height: 50px;
  
  /* Box Model */
  margin: 10px;
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  
  /* Visual Properties */
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);
  
  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  
  /* Other */
  cursor: pointer;
  transition: all 0.2s ease;
}

/* States */
.selector:hover {}
.selector:focus {}
.isActive {}

/* Media Queries - at the end */
@media (max-width: 768px) {}
```

## CSS Modules Rules

1. **Class Naming**
   - Use camelCase for class names: `.profileContainer`
   - Use descriptive names that indicate purpose
   - Avoid overly generic names like `.container` (use `.profileContainer` instead)
   - Suffix state classes with state: `.isActive`, `.hasError`

2. **CSS Module Usage in Components**
   ```tsx
   import styles from './ComponentName.module.css';
   
   export const ComponentName = () => {
     return (
       <div className={styles.container}>
         <button className={styles.button}>Click me</button>
       </div>
     );
   };
   ```

3. **Conditional Classes**
   ```tsx
   <div className={`${styles.container} ${isActive ? styles.isActive : ''}`}>
   // OR using classnames library
   <div className={classNames(styles.container, { [styles.isActive]: isActive })}>
   ```

## CSS Variables

1. **Design Tokens**
   - Define all design tokens as CSS variables
   - Use meaningful, consistent variable names
   - Organize variables by category

2. **Variable Structure**
   ```css
   :root {
     /* Colors */
     --color-primary: #0A66C2;
     --color-primary-dark: #004182;
     --color-error: #E93B3D;
     --color-success: #057642;
     
     /* Typography */
     --font-family-base: 'Inter', sans-serif;
     --font-size-xs: 12px;
     --font-size-sm: 14px;
     --font-size-md: 16px;
     --font-size-lg: 18px;
     --font-size-xl: 20px;
     
     /* Spacing */
     --spacing-xs: 4px;
     --spacing-sm: 8px;
     --spacing-md: 16px;
     --spacing-lg: 24px;
     --spacing-xl: 32px;
     
     /* Border Radius */
     --border-radius-sm: 4px;
     --border-radius-md: 8px;
     --border-radius-lg: 12px;
     
     /* Shadows */
     --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
     --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
     --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
   }
   ```

## Styling Rules

1. **No Inline Styles**
   - Avoid inline styles (`style={}`) except for dynamic values that can't be handled with CSS modules
   - Use CSS modules for all static styling

2. **Media Queries**
   - Use standard breakpoints defined in variables
   - Mobile-first approach (start with mobile styles, then add breakpoints for larger screens)
   ```css
   :root {
     --breakpoint-sm: 576px;
     --breakpoint-md: 768px;
     --breakpoint-lg: 992px;
     --breakpoint-xl: 1200px;
   }
   
   .container {
     flex-direction: column;
   }
   
   @media (min-width: 768px) {
     .container {
       flex-direction: row;
     }
   }
   ```

3. **Z-Index Management**
   - Define z-index values as variables
   - Use consistent z-index scale
   ```css
   :root {
     --z-index-dropdown: 100;
     --z-index-sticky: 200;
     --z-index-fixed: 300;
     --z-index-modal-backdrop: 400;
     --z-index-modal: 500;
     --z-index-popover: 600;
     --z-index-tooltip: 700;
   }
   ```

## Implementation of Design System

1. All UI components must adhere to the design system's:
   - Color palette
   - Typography scale
   - Spacing system
   - Component specifications

2. Reference the full design system documentation in `design.md` for detailed specifications.

3. Use the GauntletIn standard component library when available instead of creating custom implementations. 