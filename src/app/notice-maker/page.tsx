'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NoticeForm } from './components/NoticeForm'
import { NoticePreview } from './components/NoticePreview'
import { NoticeActions } from './components/NoticeActions'
import { NoticeInstructions } from './components/NoticeInstructions'
import { PrintableNotice } from './components/PrintableNotice'
import { FontControls } from './components/FontControls'
import { useNoticeForm } from './hooks/useNoticeForm'
import { useNoticeGenerator } from './hooks/useNoticeGenerator'
import { parseNoticeContent } from './utils/notice-generator'

/**
 * Notice Maker Page - Main component for the Malayalam notice generator
 */
export default function NoticeMakerPage() {
  const { formData, handleFormDataChange } = useNoticeForm()
  const {
    noticeText,
    isNoticeReady,
    isGenerating,
    printableRef,
    handleOpenPrintPreview,
    handleDownloadPDF
  } = useNoticeGenerator(formData)

  // Parse notice content for the printable component
  const noticeContent = noticeText ? parseNoticeContent(noticeText) : null

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">മരണക്കത്ത് Maker</h1>
          <p className="text-muted-foreground">എളുപ്പത്തിൽ മലയാളം മരണക്കത്ത് തയ്യാറാക്കാം</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>മരണക്കത്തിന്റെ വിവരങ്ങൾ</CardTitle>
            </CardHeader>
            <CardContent>
              <NoticeForm 
                formData={formData} 
                onFormDataChange={handleFormDataChange} 
              />
              
              <div className="mt-6">
                <NoticeActions
                  isNoticeReady={isNoticeReady}
                  isGenerating={isGenerating}
                  onOpenPrintPreview={handleOpenPrintPreview}
                  onDownloadPDF={handleDownloadPDF}
                />
              </div>

              {/* Optional Font Controls */}
              <div className="mt-6 pt-6 border-t">
                <FontControls />
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>കത്തിന്‍റെ ഉള്ളടക്കം</CardTitle>
            </CardHeader>
            <CardContent>
              <NoticePreview noticeText={noticeText} />
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <NoticeInstructions />
        </div>

        {/* Hidden printable component for react-to-print */}
        <div style={{ display: 'none' }}>
          {noticeContent && (
            <PrintableNotice 
              ref={printableRef}
              content={noticeContent}
            />
          )}
        </div>
      </div>
    </div>
  )
}
