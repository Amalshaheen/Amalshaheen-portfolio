import { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { NoticeFormData } from '../types'
import { generateNoticeText, validateFormData, generateFileName } from '../utils/notice-generator'
import { parseNoticeContent } from '../utils/notice-generator'

/**
 * Custom hook for managing notice generation logic
 */
export function useNoticeGenerator(formData: NoticeFormData) {
  const [noticeText, setNoticeText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Create a ref for the printable component
  const printableRef = useRef<HTMLDivElement>(null)

  // Generate notice text whenever form data changes
  useEffect(() => {
    const text = generateNoticeText(formData)
    setNoticeText(text)
  }, [formData])

  // Validate if notice is ready to be generated
  const { isValid: isNoticeReady } = validateFormData(formData)

  // Configure react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printableRef,
    onBeforePrint: () => {
      setIsGenerating(true)
      return Promise.resolve()
    },
    onAfterPrint: () => {
      setIsGenerating(false)
    },
    onPrintError: (error) => {
      console.error('Print error:', error)
      setIsGenerating(false)
      alert('Error occurred while printing. Please try again.')
    }
  })

  /**
   * Open print preview using react-to-print
   */
  const handleOpenPrintPreview = async () => {
    if (!isNoticeReady || !noticeText) {
      alert('Please fill all required fields first')
      return
    }

    try {
      const content = parseNoticeContent(noticeText)
      if (!content) {
        throw new Error('Failed to parse notice content')
      }

      // Trigger the print using react-to-print
      handlePrint()
    } catch (error) {
      console.error('Error generating print preview:', error)
      alert('Error generating print preview. Please try again.')
    }
  }

  /**
   * Download notice as PDF
   */
  const handleDownloadPDF = async () => {
    if (!isNoticeReady || !noticeText) {
      alert('Please fill all required fields first')
      return
    }

    if (!printableRef.current) {
      alert('Print component not ready. Please try again.')
      return
    }

    setIsGenerating(true)
    
    try {
      const content = parseNoticeContent(noticeText)
      if (!content) {
        throw new Error('Failed to parse notice content')
      }

      // Generate filename based on form data
      const filename = generateFileName(formData).replace('.html', '.pdf')
      
      // Configure html2pdf options
      const options = {
        margin: 0,
        filename: filename,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'landscape',
          compress: true
        },
        pagebreak: { 
          mode: 'avoid-all' 
        }
      }

      // Generate PDF from the printable component
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf()
        .set(options)
        .from(printableRef.current)
        .save()

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    noticeText,
    isNoticeReady,
    isGenerating,
    printableRef,
    handleOpenPrintPreview,
    handleDownloadPDF
  }
}
