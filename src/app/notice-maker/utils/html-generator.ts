import { NoticeContent, HTMLGenerationOptions } from '../types'
import { PRINT_SETTINGS } from '../constants'

/**
 * HTML template generator for printable notices
 */

/**
 * Generate complete HTML document for printing
 */
export function generatePrintableHTML(
  content: NoticeContent,
  options: HTMLGenerationOptions = {}
): string {
  const { title = `മരണക്കത്ത് - ${new Date().toISOString().split('T')[0]}` } = options
  
  return `<!DOCTYPE html>
<html lang="ml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    ${generateStyles()}
</head>
<body>
    ${generateHeader()}
    ${generatePrintButton()}
    ${generateFontToggleButton()}
    ${generateFontSizeControls()}
    ${generateDimensionsInfo()}
    ${generatePageLayout(content)}
    ${generateFontSizeScript()}
</body>
</html>`
}

/**
 * Generate individual notice HTML content
 */
export function generateNoticeHTML(content: NoticeContent): string {
  const { greeting, mainText, footerLine1, footerLine2 } = content
  
  // Extract left and right parts from footer by splitting on multiple spaces
  const footerParts1 = footerLine1.split(/\s{16,}/)
  const footerParts2 = footerLine2.split(/\s{16,}/)
  
  const leftPart1 = footerParts1[0] || ''
  const rightPart1 = footerParts1[1] || ''
  const leftPart2 = footerParts2[0] || ''
  const rightPart2 = footerParts2[1] || ''
  
  return `
    <div class="notice-content-wrapper">
      <!-- Cutting guide markers as actual elements for better print visibility -->
      <div class="cutting-guide cutting-guide-top"></div>
      <div class="cutting-guide cutting-guide-left"></div>
      
      <div class="greeting">${greeting}</div>
      <div class="main-text">
        <div class="main-text-content">${mainText}</div>
      </div>
      <div class="footer">
        <div class="footer-left">
          <div>${leftPart1}</div>
          <div>${leftPart2}</div>
        </div>
        <div class="footer-right">
          <div>${rightPart1}</div>
          <div>${rightPart2}</div>
        </div>
      </div>
    </div>`
}

/**
 * Generate CSS styles for the HTML document
 */
function generateStyles(): string {
  return `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600&display=swap');
        
        /* CSS Custom Properties for dynamic font sizing */
        :root {
            --base-font-size: 13pt;
            --greeting-font-size: 14pt;
            --footer-font-size: 12pt;
            --line-height: 1.6;
            --greeting-line-height: 1.4;
            --main-text-line-height: 1.8;
            /* Cutting guide properties for reliable printing */
            --cutting-guide-color: #000;
            --cutting-guide-style: solid;
            --cutting-guide-width: 1px;
        }
        
        /* Auto font scaling for very long text */
        .notice-content-wrapper {
            font-size: var(--base-font-size);
        }
        
        .notice-content-wrapper:has(.main-text-content:is([data-long-text])) {
            --base-font-size: max(10pt, calc(var(--base-font-size) * 0.9));
            --greeting-font-size: max(11pt, calc(var(--greeting-font-size) * 0.9));
            --footer-font-size: max(9pt, calc(var(--footer-font-size) * 0.9));
        }
        
        /* CSS Page Rule for strict A4 Landscape */
        @page {
            size: A4 landscape;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Malayalam', 'Arial', sans-serif;
            background: white;
            margin: 0;
            padding: 0;
        }
        
        /* A4 Landscape: 297mm x 210mm */
        .page {
            width: 297mm;
            height: 210mm;
            background: white;
            margin: 0 auto;
            padding: 10mm; /* 1cm outer margin */
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 20mm; /* 2cm gap between squares */
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
        }
        
        /* Horizontal cutting guide line - Using border for reliable print visibility */
        .page::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 10mm;
            right: 10mm;
            height: 0;
            border-top: 1px solid #000;
            opacity: 0.3;
            z-index: 10;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        
        /* Vertical cutting guide line - Using border for reliable print visibility */
        .page::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 10mm;
            bottom: 10mm;
            width: 0;
            border-left: 1px solid #000;
            opacity: 0.3;
            z-index: 10;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        
        .notice-box {
            border: 2px solid #000;
            padding: 3mm;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: white;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .notice-content-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            padding: 1mm;
            font-size: var(--base-font-size);
            line-height: var(--line-height);
            color: #000;
            font-weight: 400;
            overflow: hidden;
        }
        
        .greeting {
            text-align: center;
            margin-top: 4mm;
            margin-bottom: 6mm;
            font-size: var(--greeting-font-size);
            font-weight: 600;
            line-height: var(--greeting-line-height);
        }
        
        .main-text {
            text-align: justify;
            margin-bottom: 6mm;
            flex: 1;
            display: flex;
            align-items: center;
            line-height: var(--main-text-line-height);
            overflow: hidden;
        }
        
        .main-text-content {
            width: 100%;
            text-indent: 2em;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: auto;
            font-size: var(--footer-font-size);
        }
        
        .footer-left,
        .footer-right {
            line-height: 1.4;
        }
        
        .footer-left {
            text-align: left;
        }
        
        .footer-right {
            text-align: right;
        }
        
        /* Cutting guide elements - Real HTML elements for maximum print compatibility */
        .cutting-guide {
            position: absolute;
            background: #000 !important;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            z-index: 100;
        }
        
        .cutting-guide-top {
            top: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 8mm;
            height: 1px;
        }
        
        .cutting-guide-left {
            left: -2px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 8mm;
        }
        
        /* Screen visibility enhancement */
        @media screen {
            .cutting-guide {
                background: #666 !important;
                opacity: 0.8;
            }
        }
        
        /* Print visibility enforcement */
        @media print {
            .cutting-guide {
                background: #000 !important;
                opacity: 1 !important;
                display: block !important;
            }
        }
        
        /* Print styles - strict A4 enforcement */
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
                box-sizing: border-box !important;
            }
            
            html, body {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                font-size: 12pt !important;
            }
            
            .page {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 10mm !important; /* Maintain 1cm outer margin */
                page-break-after: avoid !important;
                page-break-inside: avoid !important;
                box-sizing: border-box !important;
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                grid-template-rows: 1fr 1fr !important;
                gap: 20mm !important; /* Maintain 2cm gap between squares */
                background: white !important;
                overflow: hidden !important;
            }
            
            /* Keep ALL cutting guides visible in print - both page and notice guides */
            .page::before,
            .page::after {
                border-color: #000 !important;
                opacity: 1 !important;
                display: block !important;
                print-color-adjust: exact !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            /* Ensure cutting guide elements remain visible and properly colored in print */
            .cutting-guide {
                background: #000 !important;
                print-color-adjust: exact !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                opacity: 1 !important;
                display: block !important;
                visibility: visible !important;
            }
            
            .notice-box {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                border: 2px solid #000 !important;
                padding: 3mm !important;
                background: white !important;
                box-sizing: border-box !important;
                overflow: hidden !important;
            }
            
            .no-print {
                display: none !important;
            }
            
            /* Ensure exact A4 dimensions with no browser margins */
            @page {
                size: A4 landscape;
                margin: 0mm !important;
            }
            
            /* Browser compatibility - force exact dimensions */
            @page :first {
                margin: 0mm;
            }
        }
        
        /* Screen preview styles */
        @media screen {
            body {
                background: #f5f5f5;
                padding: 20px;
            }
            
            .page {
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border: 1px solid #ddd;
            }
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .print-button:hover {
            background: #0056b3;
        }
        
        .font-size-controls {
            position: fixed;
            top: 80px;
            right: 20px;
            display: none; /* Initially hidden */
            flex-direction: column;
            gap: 8px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            
            /* Blurred container styling */
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.1),
                0 2px 8px rgba(0, 0, 0, 0.05);
            min-width: 220px;
            
            /* Fallback for browsers that don't support backdrop-filter */
            background-image: 
                linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        }
        
        /* Modern browsers with backdrop-filter support */
        @supports (backdrop-filter: blur(12px)) {
            .font-size-controls {
                background: rgba(255, 255, 255, 0.75);
                background-image: none;
            }
        }
        
        .font-size-controls.show {
            display: flex;
            opacity: 1;
            transform: translateX(0) scale(1);
            animation: slideInBlur 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideInBlur {
            0% {
                opacity: 0;
                transform: translateX(20px) scale(0.95);
                backdrop-filter: blur(0px);
            }
            100% {
                opacity: 1;
                transform: translateX(0) scale(1);
                backdrop-filter: blur(12px);
            }
        }
        
        .font-toggle-button {
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(108, 117, 125, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 10px 12px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            z-index: 1001;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            min-width: 140px;
        }
        
        .font-toggle-button:hover {
            background: rgba(73, 80, 87, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .font-toggle-button.active {
            background: rgba(40, 167, 69, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        
        .font-toggle-button.active:hover {
            background: rgba(33, 136, 56, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .font-control-group {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            padding: 10px 12px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border: 1px solid rgba(255, 255, 255, 0.4);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
        }
        
        .font-control-group:hover {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .font-control-label {
            font-size: 12px;
            font-weight: 500;
            color: #333;
            min-width: 60px;
        }
        
        .font-control-button {
            background: rgba(108, 117, 125, 0.8);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            width: 32px;
            height: 32px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .font-control-button:hover {
            background: rgba(73, 80, 87, 0.9);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .font-control-button:active {
            background: rgba(52, 58, 64, 0.9);
            transform: translateY(0);
        }
        
        .font-size-display {
            font-size: 12px;
            color: #444;
            font-weight: 500;
            min-width: 40px;
            text-align: center;
            background: rgba(248, 249, 250, 0.8);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .reset-button {
            background: rgba(40, 167, 69, 0.8);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            margin-top: 4px;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        
        .reset-button:hover {
            background: rgba(33, 136, 56, 0.9);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .header-note {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            max-width: 297mm;
            margin-left: auto;
            margin-right: auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dimensions-info {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
            z-index: 1000;
        }
    </style>`
}

/**
 * Generate header section with instructions
 */
function generateHeader(): string {
  return `
    <div class="no-print header-note">
        <strong>${PRINT_SETTINGS.PAGE_SIZE.toUpperCase()} മരണക്കത്ത് ലേഔട്ട്</strong><br>
        Dimensions: ${PRINT_SETTINGS.DIMENSIONS} | Set printer to ${PRINT_SETTINGS.PAGE_SIZE} mode<br>
        <small style="color: #666;">💡 Click "Font Controls" button if text overflows (Ctrl/Cmd+F)</small>
    </div>`
}

/**
 * Generate print button
 */
function generatePrintButton(): string {
  return `
    <button class="print-button no-print" onclick="window.print()">
        🖨️ Print ${PRINT_SETTINGS.PAGE_SIZE.toUpperCase()}
    </button>`
}

/**
 * Generate font size toggle button
 */
function generateFontToggleButton(): string {
  return `
    <button class="font-toggle-button no-print" onclick="toggleFontControls()" id="font-toggle-btn">
        🔤 Font Controls
    </button>`
}

/**
 * Generate font size control buttons
 */
function generateFontSizeControls(): string {
  return `
    <div class="font-size-controls no-print" id="font-controls">
        <div style="text-align: center; font-size: 11px; color: #555; margin-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600;">
            <div style="font-size: 13px; margin-bottom: 2px;">🔤 Font Size Controls</div>
            <small style="color: #666;">Adjust if text overflows</small>
        </div>
        
        <div class="font-control-group">
            <span class="font-control-label">Base Size:</span>
            <button class="font-control-button" onclick="adjustFontSize('base', -1)" title="Decrease base font size">−</button>
            <span class="font-size-display" id="base-size-display">13pt</span>
            <button class="font-control-button" onclick="adjustFontSize('base', 1)" title="Increase base font size">+</button>
        </div>
        
        <div class="font-control-group">
            <span class="font-control-label">Greeting:</span>
            <button class="font-control-button" onclick="adjustFontSize('greeting', -1)" title="Decrease greeting font size">−</button>
            <span class="font-size-display" id="greeting-size-display">14pt</span>
            <button class="font-control-button" onclick="adjustFontSize('greeting', 1)" title="Increase greeting font size">+</button>
        </div>
        
        <div class="font-control-group">
            <span class="font-control-label">Footer:</span>
            <button class="font-control-button" onclick="adjustFontSize('footer', -1)" title="Decrease footer font size">−</button>
            <span class="font-size-display" id="footer-size-display">12pt</span>
            <button class="font-control-button" onclick="adjustFontSize('footer', 1)" title="Increase footer font size">+</button>
        </div>
        
        <button class="reset-button" onclick="resetFontSizes()" title="Reset all font sizes to default">
            Reset All
        </button>
        
        <div style="text-align: center; font-size: 10px; color: #666; margin-top: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 500; background: rgba(248, 249, 250, 0.6); padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(0, 0, 0, 0.1);">
            ⌨️ Shortcuts: Ctrl/Cmd + F (toggle) / + / - / 0
        </div>
    </div>`
}

/**
 * Generate dimensions information
 */
function generateDimensionsInfo(): string {
  return `
    <div class="dimensions-info no-print">
        ${PRINT_SETTINGS.PAGE_SIZE.toUpperCase()}: ${PRINT_SETTINGS.DIMENSIONS} | ${PRINT_SETTINGS.COPIES_PER_PAGE} മരണക്കത്തുകൾ
    </div>`
}

/**
 * Generate the main page layout with notice boxes
 */
function generatePageLayout(content: NoticeContent): string {
  const noticeHTML = generateNoticeHTML(content)
  
  return `
    <div class="page">
        <div class="notice-box">
            ${noticeHTML}
        </div>
        
        <div class="notice-box">
            ${noticeHTML}
        </div>
        
        <div class="notice-box">
            ${noticeHTML}
        </div>
        
        <div class="notice-box">
            ${noticeHTML}
        </div>
    </div>`
}

/**
 * Open a new window with the generated HTML content
 */
export function openPrintWindow(htmlContent: string): boolean {
  try {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      
      // Wait for fonts to load before focusing
      setTimeout(() => {
        printWindow.focus()
      }, 1000)
      
      return true
    }
    return false
  } catch (error) {
    console.error('Error opening print window:', error)
    return false
  }
}

/**
 * Download HTML content as a file
 */
export function downloadHTMLFile(htmlContent: string, filename: string): void {
  try {
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading file:', error)
    throw new Error('Failed to download file')
  }
}

/**
 * Generate JavaScript for font size controls
 */
function generateFontSizeScript(): string {
  return `
    <script>
        // Font size management
        const fontSizes = {
            base: 13,
            greeting: 14,
            footer: 12
        };
        
        const defaultSizes = { ...fontSizes };
        let fontControlsVisible = false;
        
        // Toggle font controls visibility
        function toggleFontControls() {
            const controls = document.getElementById('font-controls');
            const toggleBtn = document.getElementById('font-toggle-btn');
            
            if (!controls || !toggleBtn) return;
            
            fontControlsVisible = !fontControlsVisible;
            
            if (fontControlsVisible) {
                controls.classList.add('show');
                toggleBtn.classList.add('active');
                toggleBtn.innerHTML = '🔤 Hide Font Controls';
                toggleBtn.setAttribute('title', 'Hide font size controls');
            } else {
                controls.classList.remove('show');
                toggleBtn.classList.remove('active');
                toggleBtn.innerHTML = '🔤 Font Controls';
                toggleBtn.setAttribute('title', 'Show font size controls');
            }
        }
        
        function adjustFontSize(type, delta) {
            const minSize = 8;
            const maxSize = 20;
            
            fontSizes[type] = Math.max(minSize, Math.min(maxSize, fontSizes[type] + delta));
            updateFontSize(type);
            updateDisplay(type);
        }
        
        function updateFontSize(type) {
            const root = document.documentElement;
            const varName = type === 'base' ? '--base-font-size' : 
                          type === 'greeting' ? '--greeting-font-size' : 
                          '--footer-font-size';
            
            root.style.setProperty(varName, fontSizes[type] + 'pt');
        }
        
        function updateDisplay(type) {
            const displayElement = document.getElementById(type + '-size-display');
            if (displayElement) {
                displayElement.textContent = fontSizes[type] + 'pt';
            }
        }
        
        function resetFontSizes() {
            Object.keys(defaultSizes).forEach(type => {
                fontSizes[type] = defaultSizes[type];
                updateFontSize(type);
                updateDisplay(type);
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'f':
                    case 'F':
                        e.preventDefault();
                        toggleFontControls();
                        break;
                    case '=':
                    case '+':
                        if (fontControlsVisible) {
                            e.preventDefault();
                            adjustFontSize('base', 1);
                        }
                        break;
                    case '-':
                        if (fontControlsVisible) {
                            e.preventDefault();
                            adjustFontSize('base', -1);
                        }
                        break;
                    case '0':
                        if (fontControlsVisible) {
                            e.preventDefault();
                            resetFontSizes();
                        }
                        break;
                }
            }
        });
        
        // Close controls when clicking outside
        document.addEventListener('click', function(e) {
            const controls = document.getElementById('font-controls');
            const toggleBtn = document.getElementById('font-toggle-btn');
            
            if (fontControlsVisible && controls && toggleBtn && 
                !controls.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                // Don't auto-close, let user decide when to hide
            }
        });
        
        // Initialize displays
        document.addEventListener('DOMContentLoaded', function() {
            Object.keys(fontSizes).forEach(type => {
                updateDisplay(type);
            });
            
            // Debug print dimensions
            console.log('🖨️ Print Layout Debug Info:');
            console.log('- A4 Landscape: 297mm × 210mm');
            console.log('- Outer margin: 10mm (1cm)');
            console.log('- Gap between notices: 20mm (2cm)');
            console.log('- Each notice area: ~128.5mm × 85mm');
        });
        
        // Print event debugging
        window.addEventListener('beforeprint', function() {
            console.log('🖨️ Preparing for print with exact margins:');
            const page = document.querySelector('.page');
            if (page) {
                const computedStyle = window.getComputedStyle(page);
                console.log('- Page padding:', computedStyle.padding);
                console.log('- Grid gap:', computedStyle.gap);
                console.log('- Page dimensions:', computedStyle.width, 'x', computedStyle.height);
            }
            console.log('✂️ Cutting guides: Using real HTML elements for maximum print compatibility');
            console.log('- Guide method: HTML divs with background colors');
            console.log('- Print color adjust: exact (forces background visibility)');
            console.log('- Fallback: Multiple browser-specific color adjustment properties');
            
            // Count cutting guides for verification
            const guides = document.querySelectorAll('.cutting-guide');
            console.log('- Found ' + guides.length + ' cutting guide elements');
        });
        
        window.addEventListener('afterprint', function() {
            console.log('✅ Print completed - cutting guides should be visible in both preview and print');
        });
    </script>`
}
