import React from 'react'
import { parseNoticeContent } from '../utils/notice-generator'

interface NoticePreviewProps {
  noticeText: string
}

/**
 * Preview component for displaying the generated notice with proper formatting
 */
export function NoticePreview({ noticeText }: NoticePreviewProps) {
  if (!noticeText) {
    return <EmptyPreview />
  }

  const content = parseNoticeContent(noticeText)
  if (!content) {
    return <EmptyPreview />
  }

  const { greeting, mainText, footerLine1, footerLine2 } = content
  
  // Extract left and right parts from footer by splitting on multiple spaces
  const footerParts1 = footerLine1.split(/\s{16,}/)
  const footerParts2 = footerLine2.split(/\s{16,}/)
  
  const leftPart1 = footerParts1[0] || ''
  const rightPart1 = footerParts1[1] || ''
  const leftPart2 = footerParts2[0] || ''
  const rightPart2 = footerParts2[1] || ''

  return (
    <div className="bg-white text-black p-8 rounded-lg border-2 border-gray-400 shadow-lg">
      <div className="border-2 border-black p-6 rounded">
        <div className={`notice-preview-wrapper ${mainText.length > 200 ? 'long-text' : ''}`}>
          {/* Preview styles */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .notice-preview-wrapper {
                font-family: 'Noto Sans Malayalam', 'Arial', sans-serif;
                min-height: 200px;
                display: flex;
                flex-direction: column;
              }
              
              .preview-greeting {
                font-size: 14pt;
                line-height: 1.4;
                margin-bottom: 16px;
                font-weight: 500;
                text-align: center;
              }
              
              .preview-main-text {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
                text-align: justify;
              }
              
              .preview-main-text-content {
                font-size: 13pt;
                line-height: 1.8;
                font-weight: 400;
                text-align: justify;
                text-align-last: left;
                text-indent: 2em;
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
                width: 100%;
              }
              
              .preview-footer {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: 12pt;
                line-height: 1.4;
                margin-top: auto;
              }
              
              .preview-footer-left,
              .preview-footer-right {
                display: flex;
                flex-direction: column;
              }
              
              .preview-footer-left {
                text-align: left;
              }
              
              .preview-footer-right {
                text-align: right;
              }
              
              /* Auto font scaling for long text */
              .notice-preview-wrapper.long-text .preview-greeting {
                font-size: 12pt;
              }
              
              .notice-preview-wrapper.long-text .preview-main-text-content {
                font-size: 11pt;
                line-height: 1.6;
              }
              
              .notice-preview-wrapper.long-text .preview-footer {
                font-size: 10pt;
              }
            `
          }} />
          
          <div 
            className="preview-greeting" 
            dangerouslySetInnerHTML={{ __html: greeting }}
          />
          <div className="preview-main-text">
            <div 
              className="preview-main-text-content"
              dangerouslySetInnerHTML={{ __html: mainText }}
            />
          </div>
          <div className="preview-footer">
            <div className="preview-footer-left">
              <div dangerouslySetInnerHTML={{ __html: leftPart1 }} />
              <div dangerouslySetInnerHTML={{ __html: leftPart2 }} />
            </div>
            <div className="preview-footer-right">
              <div dangerouslySetInnerHTML={{ __html: rightPart1 }} />
              <div dangerouslySetInnerHTML={{ __html: rightPart2 }} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-4 text-center">
        കത്തിന്‍റെ - PDF ൽ 2×2 ഗ്രിഡിൽ ക്രമീകരിച്ച 4 കോപ്പികൾ ഉണ്ടായിരിക്കും
      </p>
      <p className="text-xs text-green-600 mt-2 text-center">
        ✨ പ്രിന്റ് പ്രിവ്യൂവിൽ സ്വയം ഫോണ്ട് സൈസ് അഡ്ജസ്റ്റ് ചെയ്യും • ടെക്സ്റ്റ് ജസ്റ്റിഫൈ ചെയ്യും • പാരഗ്രാഫ് ഇൻഡന്റേഷൻ ഉണ്ടാകും
      </p>
    </div>
  )
}

function EmptyPreview() {
  return (
    <div className="bg-gray-50 text-gray-500 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center min-h-[300px] flex items-center justify-center">
      <div>
        <p className="text-lg font-medium mb-2">കത്തിന്‍റെ ഉള്ളടക്കം കാണാൻ ഫോം പൂരിപ്പിക്കുക</p>
        <p className="text-sm">നിങ്ങൾ ടൈപ്പ് ചെയ്യുമ്പോൾ മരണക്കത്ത് ഇവിടെ ദൃശ്യമാകും</p>
      </div>
    </div>
  )
}
