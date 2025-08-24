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
  const { title = `Notice - ${new Date().toISOString().split('T')[0]}` } = options
  
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
    ${generateDimensionsInfo()}
    ${generatePageLayout(content)}
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
    <div style="display: flex; flex-direction: column; height: 100%; padding: 1mm; font-size: 13pt; line-height: 1.6; color: #000; font-weight: 400;">
      <div style="text-align: center; margin-top: 4mm; margin-bottom: 6mm; font-size: 14pt; font-weight: 600;">${greeting}</div>
      <div style="text-align: justify; margin-bottom: 6mm; flex: 1; display: flex; align-items: center; line-height: 1.8;"><div style="width: 100%; text-indent: 2em;">${mainText}</div></div>
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; font-size: 12pt;">
        <div style="text-align: left; line-height: 1.4;">
          <div>${leftPart1}</div>
          <div>${leftPart2}</div>
        </div>
        <div style="text-align: right; line-height: 1.4;">
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
            padding: 10mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 20mm;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
        }
        
        /* Horizontal cutting guide line */
        .page::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #999;
            opacity: 0.5;
            z-index: 10;
        }
        
        /* Vertical cutting guide line */
        .page::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 1px;
            background: #999;
            opacity: 0.5;
            z-index: 10;
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
        
        .notice-content {
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            font-weight: 500;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
        }
        
        /* Cut line indicators */
        .notice-box::before {
            content: '';
            position: absolute;
            top: -1mm;
            left: 50%;
            transform: translateX(-50%);
            width: 8mm;
            height: 1px;
            background: #666;
            opacity: 0.7;
        }
        
        .notice-box::after {
            content: '';
            position: absolute;
            left: -1mm;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 8mm;
            background: #666;
            opacity: 0.7;
        }
        
        /* Print styles - strict A4 enforcement */
        @media print {
            html, body {
                width: 297mm;
                height: 210mm;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            
            .page {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 5mm !important;
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            
            /* Hide cutting guides in print */
            .page::before,
            .page::after {
                display: none !important;
            }
            
            .notice-box {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .no-print {
                display: none !important;
            }
            
            /* Ensure exact A4 dimensions */
            @page {
                size: A4 landscape;
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
        <strong>${PRINT_SETTINGS.PAGE_SIZE.toUpperCase()} Notice Layout</strong><br>
        Dimensions: ${PRINT_SETTINGS.DIMENSIONS} | Set printer to ${PRINT_SETTINGS.PAGE_SIZE} mode<br>
        Cut along the borders after printing for individual notices
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
 * Generate dimensions information
 */
function generateDimensionsInfo(): string {
  return `
    <div class="dimensions-info no-print">
        ${PRINT_SETTINGS.PAGE_SIZE.toUpperCase()}: ${PRINT_SETTINGS.DIMENSIONS} | ${PRINT_SETTINGS.COPIES_PER_PAGE} notices
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
