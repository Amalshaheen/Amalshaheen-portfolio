import React from 'react'

interface NoticePreviewProps {
  noticeText: string
}

/**
 * Preview component for displaying the generated notice
 */
export function NoticePreview({ noticeText }: NoticePreviewProps) {
  if (!noticeText) {
    return <EmptyPreview />
  }

  // Create markup object for dangerouslySetInnerHTML
  const createMarkup = () => {
    return { __html: noticeText }
  }

  return (
    <div className="bg-white text-black p-8 rounded-lg border-2 border-gray-400 shadow-lg">
      <div className="border-2 border-black p-6 rounded">
        <div 
          className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-center font-medium"
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
      <p className="text-xs text-gray-600 mt-4 text-center">
        Preview - PDF will contain 4 copies arranged in 2×2 grid
      </p>
    </div>
  )
}

function EmptyPreview() {
  return (
    <div className="bg-gray-50 text-gray-500 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center min-h-[300px] flex items-center justify-center">
      <div>
        <p className="text-lg font-medium mb-2">Fill the form to see preview</p>
        <p className="text-sm">Your notice will appear here as you type</p>
      </div>
    </div>
  )
}
