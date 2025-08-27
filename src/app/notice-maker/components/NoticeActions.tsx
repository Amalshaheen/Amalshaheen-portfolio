import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'

interface NoticeActionsProps {
  isNoticeReady: boolean
  isGenerating: boolean
  onOpenPrintPreview: () => void
  onDownloadHTML: () => void
}

/**
 * Action buttons for generating and downloading notices
 */
export function NoticeActions({
  isNoticeReady,
  isGenerating,
  onOpenPrintPreview,
  onDownloadHTML
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
        {isGenerating ? 'Processing...' : 'Open Print Preview'}
      </Button>
      
      <Button 
        onClick={onDownloadHTML} 
        className="w-full" 
        variant="outline"
        disabled={!isNoticeReady}
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" />
        HTML ഫയൽ ഡൗൺലോഡ് ചെയ്യുക
      </Button>
      
      {!isNoticeReady && (
        <p className="text-sm text-muted-foreground text-center">
          കത്ത് പ്രിന്റ് ചെയ്യുന്നതിന് ആവശ്യമായ എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക
        </p>
      )}
    </div>
  )
}
