import { useState, useCallback } from 'react'
import { NoticeFormData } from '../types'
import { INITIAL_FORM_DATA } from '../constants'

/**
 * Custom hook for managing form state
 */
export function useNoticeForm() {
  const [formData, setFormData] = useState<NoticeFormData>(INITIAL_FORM_DATA)

  const handleFormDataChange = useCallback((field: keyof NoticeFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
  }, [])

  return {
    formData,
    handleFormDataChange,
    resetForm
  }
}
