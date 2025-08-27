import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, Printer, FileText } from 'lucide-react'

interface NoticeActionsProps {
  isNoticeReady: boolean
  isGenerating: boolean
  onOpenPrintPreview: () => void
  onDownloadPDF: () => void
}

/**
 * Action buttons for generating and downloading notices
 */
export function NoticeActions({
  isNoticeReady,
  isGenerating,
  onOpenPrintPreview,
  onDownloadPDF
}: NoticeActionsProps) {
  return (
    <div className="space-y-3">
      <Button 
        onClick={onOpenPrintPreview} 
        className="w-full" 
        disabled={!isNoticeReady || isGenerating}
        size="lg"
      >
        <Printer className="mr-2 h-4 w-4" />
        {isGenerating ? 'Preparing Print...' : 'Print Notice'}
      </Button>
      
      <Button 
        onClick={onDownloadPDF} 
        className="w-full" 
        variant="outline"
        disabled={!isNoticeReady || isGenerating}
        size="lg"
      >
        <FileText className="mr-2 h-4 w-4" />
        {isGenerating ? 'Generating PDF...' : 'PDF ഫയൽ ഡൗൺലോഡ് ചെയ്യുക'}
      </Button>
      
      {!isNoticeReady && (
        <p className="text-sm text-muted-foreground text-center">
          കത്ത് പ്രിന്റ് ചെയ്യുന്നതിന് ആവശ്യമായ എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക
        </p>
      )}
      
      {isNoticeReady && (
        <p className="text-xs text-muted-foreground text-center">
          💡 പ്രിന്റ് ബട്ടൺ ക്ലിക്ക് ചെയ്യുമ്പോൾ A4 ലാൻഡ്‌സ്‌കേപ്പിൽ 2×2 ഗ്രിഡിൽ 4 കോപ്പികൾ പ്രിന്റ് ചെയ്യും
        </p>
      )}
      
      {isNoticeReady && (
        <p className="text-xs text-green-600 text-center">
          📄 PDF ഡൗൺലോഡ് ചെയ്ത് പിന്നീട് പ്രിന്റ് ചെയ്യാവുന്നതാണ്
        </p>
      )}
    </div>
  )
}
