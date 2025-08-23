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
        {isGenerating ? 'Generating...' : 'Open Print Preview'}
      </Button>
      
      <Button 
        onClick={onDownloadHTML} 
        className="w-full" 
        variant="outline"
        disabled={!isNoticeReady}
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" />
        Download HTML File
      </Button>
      
      {!isNoticeReady && (
        <p className="text-sm text-muted-foreground text-center">
          Please fill all required fields to enable HTML generation
        </p>
      )}
    </div>
  )
}
