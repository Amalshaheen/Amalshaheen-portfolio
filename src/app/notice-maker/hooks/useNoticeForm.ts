import { useState, useCallback } from 'react'
import { NoticeFormData } from '../types'
import { INITIAL_FORM_DATA } from '../constants'

/**
 * Custom hook for managing form state
 */
export function useNoticeForm() {
  const [formData, setFormData] = useState<NoticeFormData>(INITIAL_FORM_DATA)

  const handleFormDataChange = useCallback((field: keyof NoticeFormData, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }
      
      // Automatically set deceased gender based on relation
      if (field === 'relation') {
        switch (value) {
          case 'മകൻ': // Son
            newData.deceasedGender = 'male'
            break
          case 'മകൾ': // Daughter
          case 'ഭാര്യ': // Wife
            newData.deceasedGender = 'female'
            break
          default:
            newData.deceasedGender = 'male'
        }
      }
      
      return newData
    })
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
