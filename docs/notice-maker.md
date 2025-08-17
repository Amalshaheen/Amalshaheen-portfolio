# Notice Maker - Malayalam Death Notice Generator

## Overview

The Notice Maker is a specialized tool integrated into the portfolio that helps users create standardized Malayalam death notices with ease. This tool is particularly useful for creating traditional Islamic death notices in Malayalam script with perfect font rendering.

## Features

### 🚀 **Core Functionality**
- **Template-based Notice Generation**: Uses a standardized Malayalam template for death notices
- **Dynamic Text Generation**: Automatically generates proper Malayalam text based on form inputs
- **Live Preview**: Real-time preview of the notice as you fill the form
- **HTML Export**: Generates printable HTML with perfect Malayalam font rendering
- **Print-Ready Layout**: A4 landscape format with 4 identical notices for cutting

### 📝 **Form Fields**
1. **Place** - Location/hometown of the family
2. **Guardian Name** - Name of the deceased person's guardian/parent
3. **Guardian Status** - Whether the guardian is alive or deceased (male/female)
4. **Relation** - Relationship of deceased to guardian (മകൻ/മകൾ/ഭാര്യ)
5. **Deceased Name** - Name of the deceased person
6. **Deceased Gender** - Gender for proper Malayalam grammar
7. **Date** - Date of death with automatic day calculation

### 🎨 **UI/UX Features**
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme Support**: Integrates with the portfolio's theme system
- **Clean Interface**: Intuitive form layout with clear labels
- **Malayalam Day Display**: Shows the day of the week in Malayalam
- **Form Validation**: Ensures all required fields are completed

### 📄 **HTML Generation Features**
- **Perfect Malayalam Rendering**: Uses Noto Sans Malayalam font from Google Fonts
- **A4 Landscape Format**: Optimized for standard printing
- **4 Notices Per Page**: Arranged in 2×2 grid for efficient paper usage
- **Cut Guidelines**: Visual borders for easy cutting after printing
- **Print-Optimized CSS**: Professional formatting with print media queries
- **Two Output Options**: 
  - **Print Preview**: Opens in new window for immediate printing
  - **Download HTML**: Saves file for later use

## Technical Implementation

### 🛠 **Technologies Used**
- **Next.js 15.3.3**: React framework for the application
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible UI components
- **date-fns**: Date utility library
- **Lucide React**: Icon library
- **Google Fonts**: Noto Sans Malayalam for perfect text rendering

### 📦 **Dependencies**
```json
{
  "date-fns": "latest"
}
```

### 🏗 **Component Structure**
```
src/app/notice-maker/
├── page.tsx                 # Main Notice Maker component
└── README.md               # This documentation
```

### 🎯 **Key Components Used**
- `Card` - Layout containers
- `Input` - Text input fields
- `Select` - Dropdown selections
- `Calendar` - Date picker
- `Button` - Action buttons
- `Label` - Form labels

## Usage Instructions

### 📋 **Step-by-Step Guide**

1. **Navigate to Notice Maker**
   - Visit `/notice-maker` route in the portfolio
   - The page loads with an empty form and preview area

2. **Fill Required Information**
   - **Place**: Enter the hometown/location (e.g., "കോഴിക്കോട്")
   - **Guardian Name**: Enter guardian's name (e.g., "അബ്ദുള്ള")
   - **Guardian Status**: Select from Alive/Deceased Male/Deceased Female
   - **Relation**: Choose മകൻ (son), മകൾ (daughter), or ഭാര്യ (wife)
   - **Deceased Name**: Enter the deceased person's name
   - **Deceased Gender**: Select Male or Female for proper grammar
   - **Date**: Pick the date of death from the calendar

3. **Review Live Preview**
   - The preview updates automatically as you type
   - Check for accuracy in names, dates, and relationships
   - Verify the Malayalam text appears correctly

4. **Generate Printable Notice**
   - **"Open Print Preview"**: Opens a new window with 4 notices ready for printing
   - **"Download HTML File"**: Downloads an HTML file for later use
   - Both options use Noto Sans Malayalam font for perfect rendering

### 📜 **Notice Template Structure**

The generated notice follows this Malayalam template:

```
അസ്സലാമു അലൈകും

[Place] സ്വദേശി [GuardianPrefix][GuardianName] എന്നവരുടെ [Relation] [DeceasedName] എന്നവർ [Date] ന് ([Day]) മരണപ്പെട്ട വിവരം അറിയിക്കുന്നതോടൊപ്പം [DeceasedPossessive] പേരിൽ ജനാസ നിസ്‌കരിക്കാനും പ്രാർത്തിക്കാനും അഭ്യർത്ഥിക്കുന്നു.

[Place] [Date]
എന്ന് കുടുംബാംഗങ്ങൾ
```

### 🔤 **Grammar Rules**

The tool automatically applies proper Malayalam grammar:

- **Guardian Prefix**:
  - "" (empty) if guardian is alive
  - "പരേതനായ " if guardian is deceased male
  - "പരേതയായ " if guardian is deceased female

- **Deceased Possessive**:
  - "പരേതന്റെ" if deceased is male
  - "പരേതയുടെ" if deceased is female

### 🖨️ **Printing Instructions**

1. **Open Print Preview** or download the HTML file
2. **Set Printer Settings**:
   - Paper Size: A4
   - Orientation: Landscape
   - Margins: Minimum or None
   - Print Background Graphics: Enable
3. **Print Quality**: Best or High Quality
4. **Cut Along Borders**: Each notice has clear borders for cutting

## HTML Output Features

### 🎨 **Styling & Layout**
- **Noto Sans Malayalam Font**: Perfect Malayalam rendering from Google Fonts
- **Grid Layout**: 2×2 arrangement of notices
- **Print Optimization**: CSS media queries for print layout
- **Visual Cut Lines**: Subtle guidelines for cutting
- **Professional Appearance**: Clean, readable formatting

### 📱 **Browser Compatibility**
- **Chrome/Chromium**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Preview support (printing varies)

### 🖨️ **Print Features**
- **Print Button**: Built-in print button in the HTML
- **Print Instructions**: Clear guidance at the top
- **Print-Only Elements**: Hidden on screen, visible when printing
- **Responsive Print Layout**: Adjusts for different printer capabilities

## Advantages of HTML Approach

### ✅ **Perfect Malayalam Rendering**
- Uses Noto Sans Malayalam font specifically designed for Malayalam
- No font embedding issues
- Consistent rendering across all browsers
- Support for all Malayalam Unicode characters

### ✅ **Universal Compatibility**
- Works on any device with a browser
- No special PDF software required
- Can be saved and shared easily
- Compatible with all operating systems

### ✅ **Easy Customization**
- HTML/CSS can be easily modified
- Users can adjust styling if needed
- Accessible source code
- Can be integrated with other tools

### ✅ **Reliable Printing**
- Browser print engines are well-tested
- Consistent output across different printers
- Better handling of font rendering
- Print preview shows exactly what will print

## Error Handling

### ⚠️ **Form Validation**
- Required field validation
- Date format validation
- Character limit enforcement
- Real-time error feedback

### 🔧 **HTML Generation Issues**
- Popup blocker detection
- Fallback to file download
- Error alerts for failed generation
- Character encoding validation

## Browser Support

### ✅ **Supported Browsers**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 📱 **Mobile Support**
- iOS Safari 13+
- Chrome Mobile 80+
- Samsung Internet 12+

## Accessibility

### ♿ **Accessibility Features**
- Keyboard navigation support
- Screen reader compatible
- High contrast support
- Focus indicators
- ARIA labels and descriptions

## Security Considerations

### 🔒 **Data Privacy**
- No server-side data storage
- Client-side only processing
- No external API calls for personal data
- Local HTML generation

### 🛡️ **Input Sanitization**
- XSS prevention
- Input length limits
- Character encoding validation

## Performance

### ⚡ **Optimization Features**
- Efficient re-rendering
- Minimal bundle size
- Fast HTML generation
- Google Fonts optimization

## Contributing

### 🤝 **Development Guidelines**
- Follow TypeScript best practices
- Maintain responsive design principles
- Test on multiple devices
- Ensure Malayalam text rendering

### 🧪 **Testing**
- Test form validation
- Verify HTML generation
- Check responsive layout
- Validate Malayalam text display
- Test printing on different browsers

## License

This Notice Maker tool is part of the Amal Shaheen Portfolio project and follows the same license terms.

## Contact

For questions, suggestions, or bug reports related to the Notice Maker:
- Create an issue in the portfolio repository
- Contact through the portfolio contact form

---

**Note**: This tool is designed specifically for Malayalam Islamic death notices and follows traditional formatting conventions. The HTML output ensures perfect Malayalam text rendering and is suitable for community distribution and official purposes.
