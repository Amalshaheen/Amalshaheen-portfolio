import React, { useEffect, useRef } from 'react'
import { NoticeContent } from '../types'

interface PrintableNoticeProps {
  content: NoticeContent
  className?: string
}

/**
 * Printable notice component that can be used with react-to-print
 * This component renders a single notice in the 2x2 grid format with automatic font scaling
 */
export const PrintableNotice = React.forwardRef<HTMLDivElement, PrintableNoticeProps>(
  ({ content, className = '' }, ref) => {
    const { greeting, mainText, footerLine1, footerLine2 } = content
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Extract left and right parts from footer by splitting on multiple spaces
    const footerParts1 = footerLine1.split(/\s{16,}/)
    const footerParts2 = footerLine2.split(/\s{16,}/)
    
    const leftPart1 = footerParts1[0] || ''
    const rightPart1 = footerParts1[1] || ''
    const leftPart2 = footerParts2[0] || ''
    const rightPart2 = footerParts2[1] || ''

    // Auto-scale font size based on content length
    useEffect(() => {
      const checkTextOverflow = () => {
        if (!containerRef.current) return

        const containers = containerRef.current.querySelectorAll('.notice-content-wrapper')
        containers.forEach((container) => {
          const element = container as HTMLElement
          const mainTextElement = element.querySelector('.main-text-content') as HTMLElement
          
          if (mainTextElement) {
            // Calculate text length and apply scaling
            const textLength = mainTextElement.textContent?.length || 0
            const isLongText = textLength > 200 // Threshold for long text
            
            if (isLongText) {
              element.classList.add('long-text')
            } else {
              element.classList.remove('long-text')
            }
          }
        })
      }

      // Check on mount and after content changes
      checkTextOverflow()
      
      // Re-check after fonts load
      document.fonts?.ready.then(checkTextOverflow)
    }, [content])

    return (
      <div ref={ref} className={`printable-notice ${className}`}>
        {/* Print-specific styles */}
        <style type="text/css" media="print">{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600&display=swap');
          
          /* CSS Custom Properties for dynamic font sizing */
          :root {
            --base-font-size: 13pt;
            --greeting-font-size: 14pt;
            --footer-font-size: 12pt;
            --line-height: 1.6;
            --greeting-line-height: 1.4;
            --main-text-line-height: 1.8;
          }
          
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
          
          .printable-notice {
            width: 297mm;
            height: 210mm;
            background: white;
            margin: 0;
            padding: 10mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 20mm;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
            font-family: 'Noto Sans Malayalam', 'Arial', sans-serif;
          }
          
          /* Horizontal cutting guide line */
          .printable-notice::before {
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
          
          /* Vertical cutting guide line */
          .printable-notice::after {
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
          
          /* Auto font scaling for very long text */
          .notice-content-wrapper.long-text {
            --base-font-size: 11pt;
            --greeting-font-size: 12pt;
            --footer-font-size: 10pt;
            --main-text-line-height: 1.6;
          }
          
          .greeting {
            font-size: var(--greeting-font-size);
            line-height: var(--greeting-line-height);
            margin-bottom: 8mm;
            font-weight: 500;
            text-align: center;
          }
          
          .main-text {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8mm;
            text-align: justify;
          }
          
          .main-text-content {
            font-size: var(--base-font-size);
            line-height: var(--main-text-line-height);
            font-weight: 400;
            text-align: justify;
            text-align-last: left;
            text-indent: 2em;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
            -webkit-hyphens: auto;
            -ms-hyphens: auto;
            width: 100%;
          }
          
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: var(--footer-font-size);
            line-height: 1.4;
            margin-top: auto;
          }
          
          .footer-left,
          .footer-right {
            display: flex;
            flex-direction: column;
          }
          
          .footer-left {
            text-align: left;
          }
          
          .footer-right {
            text-align: right;
          }
          
          /* Hide screen-only elements when printing */
          @media print {
            .no-print {
              display: none !important;
            }
            
            /* Force exact colors and layouts */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* Enhanced text rendering for Malayalam */
            .main-text-content {
              text-rendering: optimizeLegibility;
              -webkit-font-feature-settings: "liga", "kern";
              font-feature-settings: "liga", "kern";
            }
          }
        `}</style>

        {/* Container for font scaling detection */}
        <div ref={containerRef} style={{ display: 'contents' }}>
          {/* Generate 4 identical notices in 2x2 grid */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="notice-box">
              <div className="notice-content-wrapper">
                <div 
                  className="greeting" 
                  dangerouslySetInnerHTML={{ __html: greeting }}
                />
                <div className="main-text">
                  <div 
                    className="main-text-content"
                    dangerouslySetInnerHTML={{ __html: mainText }}
                  />
                </div>
                <div className="footer">
                  <div className="footer-left">
                    <div dangerouslySetInnerHTML={{ __html: leftPart1 }} />
                    <div dangerouslySetInnerHTML={{ __html: leftPart2 }} />
                  </div>
                  <div className="footer-right">
                    <div dangerouslySetInnerHTML={{ __html: rightPart1 }} />
                    <div dangerouslySetInnerHTML={{ __html: rightPart2 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

PrintableNotice.displayName = 'PrintableNotice'
