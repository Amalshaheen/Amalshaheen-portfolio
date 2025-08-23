'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NoticeForm } from './components/NoticeForm'
import { NoticePreview } from './components/NoticePreview'
import { NoticeActions } from './components/NoticeActions'
import { NoticeInstructions } from './components/NoticeInstructions'
import { useNoticeForm } from './hooks/useNoticeForm'
import { useNoticeGenerator } from './hooks/useNoticeGenerator'

/**
 * Notice Maker Page - Main component for the Malayalam notice generator
 */
export default function NoticeMakerPage() {
  const { formData, handleFormDataChange } = useNoticeForm()
  const {
    noticeText,
    isNoticeReady,
    isGenerating,
    handleOpenPrintPreview,
    handleDownloadHTML
  } = useNoticeGenerator(formData)

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Notice Maker</h1>
          <p className="text-muted-foreground">Create Malayalam death notices with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Notice Details</CardTitle>
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
                  onDownloadHTML={handleDownloadHTML}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
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
      </div>
    </div>
  )
}
