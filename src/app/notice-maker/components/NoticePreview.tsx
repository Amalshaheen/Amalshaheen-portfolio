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
        കത്തിന്‍റെ - PDF ൽ 2×2 ഗ്രിഡിൽ ക്രമീകരിച്ച 4 കോപ്പികൾ ഉണ്ടായിരിക്കും
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
