# GauntletIn - Design Guide

## Brand Identity

### Brand Personality
- Professional yet approachable
- Modern and tech-forward
- Trustworthy and reliable
- Community-focused

### Logo Guidelines
- Main logo: GauntletIn wordmark with custom "In" styling
- Minimum size: 40px width
- Clear space: Equal to the height of the "G" on all sides
- Color variations: Full color, single color, inverse for dark backgrounds

## Color Palette

### Primary Colors
- **Gauntlet Blue** (#0A66C2) - Primary brand color
- **Gauntlet Dark Blue** (#004182) - Secondary brand color
- **White** (#FFFFFF) - For backgrounds and text on dark surfaces

### Secondary Colors
- **Light Blue** (#70B5F9) - For highlights and secondary elements
- **Emerald Green** (#057642) - For success states and positive actions
- **Coral Red** (#E93B3D) - For errors and destructive actions

### Neutral Colors
- **Black** (#000000) - For primary text
- **Dark Gray** (#333333) - For secondary text
- **Medium Gray** (#666666) - For tertiary text
- **Light Gray** (#E0E0E0) - For borders and separators
- **Background Gray** (#F3F2EF) - For page backgrounds

## Typography

### Font Family
- **Primary Font**: Inter (Headings and UI elements)
- **Secondary Font**: Roboto (Body text and content)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Type Scale
- **Display (H1)**: 40px/48px, Inter Bold
- **Heading (H2)**: 32px/40px, Inter Bold
- **Subheading (H3)**: 24px/32px, Inter SemiBold
- **Title (H4)**: 20px/28px, Inter SemiBold
- **Subtitle (H5)**: 18px/24px, Inter Medium
- **Body Large**: 16px/24px, Roboto Regular
- **Body**: 14px/20px, Roboto Regular
- **Caption**: 12px/16px, Roboto Regular

## Component Design

### Buttons

#### Primary Button
- Background: Gauntlet Blue
- Text: White
- Hover: Gauntlet Dark Blue
- Border-radius: 4px
- Padding: 12px 24px
- Font: 16px Inter Medium

#### Secondary Button
- Background: White
- Text: Gauntlet Blue
- Border: 1px solid Gauntlet Blue
- Hover: Light blue background
- Border-radius: 4px
- Padding: 12px 24px
- Font: 16px Inter Medium

#### Tertiary Button (Text Button)
- Text: Gauntlet Blue
- Hover: Light blue background
- Padding: 8px 16px
- Font: 16px Inter Medium

### Cards

#### Profile Card
- Background: White
- Border-radius: 8px
- Border: none
- Shadow: 0 2px 5px rgba(0,0,0,0.1)
- Padding: 20px

#### Content Card
- Background: White
- Border-radius: 8px
- Border: none
- Shadow: 0 2px 5px rgba(0,0,0,0.1)
- Padding: 16px

#### Job Card
- Background: White
- Border-radius: 8px
- Border: 1px solid Light Gray
- Hover: Shadow: 0 4px 8px rgba(0,0,0,0.1)
- Padding: 16px

### Form Elements

#### Text Input
- Height: 40px
- Border: 1px solid Light Gray
- Border-radius: 4px
- Padding: 8px 12px
- Focus: 1px solid Gauntlet Blue, light blue shadow
- Font: 14px Roboto Regular

#### Select Input
- Height: 40px
- Border: 1px solid Light Gray
- Border-radius: 4px
- Padding: 8px 12px
- Focus: 1px solid Gauntlet Blue, light blue shadow
- Font: 14px Roboto Regular

#### Checkbox
- Size: 18px × 18px
- Border: 1px solid Medium Gray
- Border-radius: 2px
- Selected: Gauntlet Blue background with white checkmark

### Navigation

#### Main Navigation
- Background: White
- Height: 52px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Active indicator: Gauntlet Blue

#### Tab Navigation
- Border-bottom: 1px solid Light Gray
- Active tab: Gauntlet Blue text, 2px solid Gauntlet Blue bottom border
- Inactive tab: Medium Gray text, no border
- Hover: Dark Gray text

## Iconography

### Icon System
- Outlined style for navigation and UI elements
- Filled style for selected states and highlights
- Size: 24px × 24px (default)
- Stroke width: 1.5px for outlines

### Common Icons
- Home
- My Network
- Jobs
- Messaging
- Notifications
- Profile
- Search
- Settings
- Create post
- Like, Comment, Share

## Spacing System

- **4px**: Minimum spacing between elements
- **8px**: Compact spacing between related elements
- **16px**: Standard spacing between components
- **24px**: Generous spacing between sections
- **32px**: Section spacing
- **48px**: Large section spacing

## Layout Guidelines

### Grid System
- 12-column grid layout
- 1180px maximum content width
- 20px gutters between columns
- 24px margins on mobile

### Responsive Breakpoints
- **Small**: 0-599px (Mobile portrait)
- **Medium**: 600-959px (Mobile landscape, tablet portrait)
- **Large**: 960-1279px (Tablet landscape, small desktop)
- **Extra Large**: 1280px and above (Large desktop)

### Card Layout
- Full width on mobile
- 2-column grid on medium screens
- 3-column grid on large screens

## Interaction States

### Standard States
- **Default**: Base appearance
- **Hover**: Subtle visual change indicating interactivity
- **Active/Pressed**: Visual feedback during interaction
- **Focus**: Visible indicator for keyboard users (blue outline)
- **Disabled**: Reduced opacity (60%) and non-interactive

### Animation Guidelines
- Keep animations subtle and purposeful
- Standard transition: 200ms ease
- Avoid excessive or distracting animations
- Use motion to guide user attention

## Imagery Guidelines

### Profile Photos
- Circular crop
- 1:1 aspect ratio
- Multiple sizes (32px, 48px, 72px, 400px)

### Cover Photos
- 16:9 aspect ratio
- Minimum size: 1584 × 396px
- Use professional, high-quality images

### Content Images
- Maximum width: 100% of container
- Maintain aspect ratio
- Lazy loading for performance
- Alt text for accessibility

## Accessibility Guidelines

- Maintain minimum 4.5:1 color contrast for text
- Support keyboard navigation with visible focus states
- Provide alternative text for all images
- Design components to support screen readers
- Ensure touch targets are at least 44 × 44px