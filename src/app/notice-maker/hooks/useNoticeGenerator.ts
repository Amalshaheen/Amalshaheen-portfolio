import { useState, useEffect } from 'react'
import { NoticeFormData } from '../types'
import { generateNoticeText, validateFormData, generateFileName } from '../utils/notice-generator'
import { 
  generatePrintableHTML, 
  openPrintWindow, 
  downloadHTMLFile 
} from '../utils/html-generator'
import { parseNoticeContent } from '../utils/notice-generator'

/**
 * Custom hook for managing notice generation logic
 */
export function useNoticeGenerator(formData: NoticeFormData) {
  const [noticeText, setNoticeText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate notice text whenever form data changes
  useEffect(() => {
    const text = generateNoticeText(formData)
    setNoticeText(text)
  }, [formData])

  // Validate if notice is ready to be generated
  const { isValid: isNoticeReady } = validateFormData(formData)

  /**
   * Open print preview in a new window
   */
  const handleOpenPrintPreview = async () => {
    if (!isNoticeReady || !noticeText) {
      alert('Please fill all required fields first')
      return
    }

    setIsGenerating(true)
    
    try {
      const content = parseNoticeContent(noticeText)
      if (!content) {
        throw new Error('Failed to parse notice content')
      }

      const htmlContent = generatePrintableHTML(content, {
        title: `Notice - ${formData.date ? formData.date.toISOString().split('T')[0] : 'draft'}`
      })

      const success = openPrintWindow(htmlContent)
      if (!success) {
        // Fallback: download the file
        const filename = generateFileName(formData)
        downloadHTMLFile(htmlContent, filename)
      }
    } catch (error) {
      console.error('Error generating HTML:', error)
      alert('Error generating HTML. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * Download HTML file
   */
  const handleDownloadHTML = () => {
    if (!isNoticeReady || !noticeText) {
      alert('Please fill all required fields first')
      return
    }

    try {
      const content = parseNoticeContent(noticeText)
      if (!content) {
        throw new Error('Failed to parse notice content')
      }

      const htmlContent = generatePrintableHTML(content, {
        title: `Notice - ${formData.date ? formData.date.toISOString().split('T')[0] : 'draft'}`
      })

      const filename = generateFileName(formData)
      downloadHTMLFile(htmlContent, filename)
    } catch (error) {
      console.error('Error downloading HTML:', error)
      alert('Error downloading HTML. Please try again.')
    }
  }

  return {
    noticeText,
    isNoticeReady,
    isGenerating,
    handleOpenPrintPreview,
    handleDownloadHTML
  }
}
