# Notice Maker - Modular Architecture

## Overview

The Notice Maker application has been refactored from a monolithic component into a modular, maintainable architecture following React and Next.js best practices. This document outlines the new structure and provides guidance for future development and debugging.

## Directory Structure

```
src/app/notice-maker/
├── page.tsx                    # Main page component (entry point)
├── components/                 # Reusable UI components
│   ├── NoticeForm.tsx         # Form for collecting notice details
│   ├── NoticePreview.tsx      # Live preview of generated notice
│   ├── NoticeActions.tsx      # Action buttons (print, download)
│   └── NoticeInstructions.tsx # User instructions component
├── hooks/                     # Custom React hooks
│   ├── useNoticeForm.ts       # Form state management
│   └── useNoticeGenerator.ts  # Notice generation logic
├── utils/                     # Utility functions
│   ├── notice-generator.ts    # Malayalam text generation
│   └── html-generator.ts      # HTML template generation
├── types/                     # TypeScript type definitions
│   └── index.ts              # All type definitions
└── constants/                 # Application constants
    └── index.ts              # Constants and configurations
```

## Architecture Benefits

### 1. **Separation of Concerns**
- **Components**: Pure UI components focused on rendering
- **Hooks**: Business logic and state management
- **Utils**: Pure functions for data transformation
- **Types**: Type safety and documentation
- **Constants**: Centralized configuration

### 2. **Maintainability**
- Each module has a single responsibility
- Easy to locate and modify specific functionality
- Reduced coupling between components
- Clear dependencies and interfaces

### 3. **Testability**
- Pure functions can be easily unit tested
- Components can be tested in isolation
- Hooks can be tested with React Testing Library
- Mocked dependencies for better test control

### 4. **Reusability**
- Components can be reused across different pages
- Utility functions can be shared between features
- Hooks encapsulate reusable logic
- Type definitions ensure consistency

## Component Details

### Core Components

#### `page.tsx` - Main Entry Point
```typescript
// Orchestrates all components and hooks
// Handles layout and page-level concerns
// Minimal business logic - mostly composition
```

#### `NoticeForm.tsx` - Form Component
```typescript
// Controlled form inputs for notice data
// Form validation and user interaction
// Reusable form field components
// Date picker with Malayalam day display
```

#### `NoticePreview.tsx` - Preview Component
```typescript
// Real-time preview of generated notice
// Handles empty state display
// Styled preview with print layout indication
```

#### `NoticeActions.tsx` - Action Buttons
```typescript
// Print preview and download actions
// Loading states and error handling
// Disabled states based on form validity
```

### Custom Hooks

#### `useNoticeForm.ts` - Form State Management
```typescript
// Manages form data state
// Provides form update handlers
// Form reset functionality
// Optimized with useCallback for performance
```

#### `useNoticeGenerator.ts` - Business Logic
```typescript
// Notice text generation from form data
// HTML generation and window management
// Error handling and user feedback
// State management for generation process
```

### Utility Functions

#### `notice-generator.ts` - Text Generation
```typescript
// Pure functions for Malayalam text generation
// Form validation logic
// Date formatting and text parsing
// Filename generation for downloads
```

#### `html-generator.ts` - HTML Templates
```typescript
// HTML template generation for printing
// CSS styling and print optimization
// Window management for print preview
// File download functionality
```

## Type System

### Core Types
- `NoticeFormData`: Form structure and validation
- `NoticeContent`: Parsed notice content structure
- `HTMLGenerationOptions`: HTML generation configuration
- `GuardianStatus`, `Relation`, `Gender`: Union types for form options

### Benefits
- Compile-time error checking
- IntelliSense support in editors
- Self-documenting code
- Refactoring safety

## Constants Configuration

### Centralized Configuration
- `INITIAL_FORM_DATA`: Default form state
- `MALAYALAM_DAYS`: Day names in Malayalam
- `PRINT_SETTINGS`: Print layout configuration
- Form option arrays for consistent UI

### Benefits
- Single source of truth for configuration
- Easy to modify application behavior
- Consistent data across components
- Type-safe constants

## Development Guidelines

### Adding New Features

1. **New Form Fields**
   ```typescript
   // 1. Update types/index.ts
   interface NoticeFormData {
     newField: string
   }
   
   // 2. Update constants/index.ts
   export const INITIAL_FORM_DATA = {
     newField: ''
   }
   
   // 3. Update NoticeForm.tsx
   // Add new form field component
   
   // 4. Update utils/notice-generator.ts
   // Include new field in text generation
   ```

2. **New Components**
   ```typescript
   // Create in components/ directory
   // Follow existing patterns for props and styling
   // Export from component file
   // Import and use in page.tsx
   ```

3. **New Utility Functions**
   ```typescript
   // Add to appropriate utils file
   // Keep functions pure (no side effects)
   // Add proper TypeScript types
   // Write unit tests
   ```

### Debugging Guidelines

1. **Form Issues**
   - Check `useNoticeForm` hook for state management
   - Verify form validation in `utils/notice-generator.ts`
   - Ensure proper prop passing to `NoticeForm`

2. **Text Generation Issues**
   - Debug in `utils/notice-generator.ts`
   - Check `generateNoticeText` function
   - Verify Malayalam text formatting

3. **HTML/Print Issues**
   - Debug in `utils/html-generator.ts`
   - Check CSS styles and print media queries
   - Verify HTML structure generation

4. **State Management Issues**
   - Check hook dependencies and effect arrays
   - Verify proper state updates and callbacks
   - Use React DevTools for state inspection

### Performance Considerations

1. **Memoization**
   - Form change handlers use `useCallback`
   - Consider `useMemo` for expensive calculations
   - Avoid unnecessary re-renders

2. **Bundle Size**
   - Tree-shaking friendly imports
   - Lazy load heavy components if needed
   - Minimize external dependencies

3. **Runtime Performance**
   - Debounce form inputs for heavy operations
   - Optimize preview updates
   - Efficient HTML generation

## Testing Strategy

### Unit Tests
```typescript
// utils/notice-generator.test.ts
describe('generateNoticeText', () => {
  it('should generate correct Malayalam text', () => {
    // Test text generation
  })
})

// components/NoticeForm.test.tsx
describe('NoticeForm', () => {
  it('should handle form input changes', () => {
    // Test component behavior
  })
})
```

### Integration Tests
```typescript
// Test complete notice generation flow
// Test form submission and HTML generation
// Test error handling scenarios
```

### E2E Tests
```typescript
// Test complete user workflows
// Test print functionality
// Test download functionality
```

## Future Enhancements

### Planned Features
1. **Notice Templates**: Multiple notice formats
2. **Batch Generation**: Generate multiple notices
3. **Data Persistence**: Save form data locally
4. **Print Customization**: Custom paper sizes and layouts
5. **Multi-language Support**: Additional regional languages

### Architecture Improvements
1. **Context API**: For complex state sharing
2. **Error Boundaries**: Better error handling
3. **Loading States**: Improved UX for async operations
4. **Offline Support**: Service worker for offline functionality

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Check relative import paths
   - Verify file extensions (.ts vs .tsx)
   - Ensure proper barrel exports

2. **Type Errors**
   - Check type definitions in types/index.ts
   - Verify prop interfaces match usage
   - Update types when adding new fields

3. **Runtime Errors**
   - Check browser console for details
   - Verify form validation logic
   - Check HTML generation functions

4. **Print Issues**
   - Test in different browsers
   - Check CSS print media queries
   - Verify A4 landscape settings

### Getting Help

1. Check component-specific documentation
2. Review type definitions for interfaces
3. Test individual utility functions
4. Use React DevTools for debugging
5. Check browser developer tools for print issues

---

This modular architecture provides a solid foundation for maintaining and extending the Notice Maker application while following React and Next.js best practices.
