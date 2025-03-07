# GauntletIn Component Guidelines

## Component Size Rules

1. **File Size Limits**
   - Maximum component file size: 300 lines
   - Maximum page component size: 200 lines
   - Maximum atomic component size: 100 lines

2. **When to Split Components**
   - Split when a component has multiple responsibilities
   - Split when a section can be reused elsewhere
   - Split when component state logic becomes complex
   - Split when a component exceeds size limits

## Component Structure Pattern

Every component must follow this structure:

```tsx
// 1. Imports
import React from 'react';
import styles from './ComponentName.module.css';

// 2. Types/Interfaces
interface ComponentNameProps {
  // Props definition with explicit types
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// 3. Component Definition
export const ComponentName: React.FC<ComponentNameProps> = ({
  label,
  onClick,
  variant = 'primary'
}) => {
  // a. Hooks
  const [state, setState] = useState(initialState);
  
  // b. Derived state and memoized values
  const derivedValue = useMemo(() => {
    // Expensive calculation
    return computeValue(state);
  }, [state]);
  
  // c. Event handlers
  const handleEvent = useCallback(() => {
    // Handle event
    setState(newState);
    onClick();
  }, [onClick]);
  
  // d. Helper render functions
  const renderItem = (item: ItemType) => (
    <div key={item.id}>{item.name}</div>
  );
  
  // e. Return JSX
  return (
    <div className={styles.container}>
      <button 
        className={styles[variant]} 
        onClick={handleEvent}
      >
        {label}
      </button>
    </div>
  );
};
```

## Component Categories

1. **Page Components** (in `/pages` directory)
   - Represent complete pages or routes
   - Handle data fetching and route params
   - Compose UI from smaller components
   - Control page-level state

2. **Feature Components** (in domain-specific directories)
   - Implement specific product features
   - May have internal state
   - Composed of multiple UI components

3. **UI Components** (domain-specific or shared)
   - Reusable interface elements
   - Focus on presentation and user interaction
   - Should be highly composable

4. **Layout Components** (typically in `shared`)
   - Handle arrangement of elements
   - Examples: Grid, Container, Section, etc.

## Naming Conventions

1. **Component Files**
   - Use PascalCase for component files: `ProfileCard.tsx`
   - Use kebab-case for component folders: `profile-card/`

2. **Component Names**
   - Use PascalCase for component names: `ProfileCard`
   - Name should clearly indicate purpose/function
   - Prefix with domain for shared components: `ProfileAvatar` vs `SharedAvatar`

3. **Props**
   - Use descriptive prop names
   - Boolean props should use "is", "has", or "should" prefix: `isDisabled`, `hasError`
   - Event handler props should start with "on": `onClick`, `onSubmit`

## Props Guidelines

1. **Props Interface Definition**
   - Always define explicit interfaces for props
   - Export interfaces when they're reused
   - Use descriptive names that indicate purpose

2. **Default Props**
   - Define defaults using destructuring default values
   - Document default values in comments or prop types

3. **Required vs Optional Props**
   - Mark truly optional props with `?`
   - Provide sensible defaults for optional props

4. **Prop Validation**
   - Use TypeScript for compile-time validation
   - Add runtime validation for critical props when needed

## Component Documentation

All components should include:

1. A brief description of its purpose
2. Documentation of all props and their types
3. Usage examples for complex components
4. Any performance considerations 