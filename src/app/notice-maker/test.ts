/**
 * Test file to verify the modular Notice Maker structure
 * This file can be used for debugging and verification
 */

import { 
  NoticeFormData, 
  INITIAL_FORM_DATA, 
  generateNoticeText, 
  validateFormData,
  generateFileName 
} from './index'

// Test data
const testFormData: NoticeFormData = {
  ...INITIAL_FORM_DATA,
  place: 'കോഴിക്കോട്',
  guardianName: 'അഹമ്മദ്',
  deceasedName: 'ഫാത്തിമ',
  date: new Date('2024-01-15')
}

// Test functions (for debugging purposes)
export function testNoticeGeneration() {
  console.log('Testing Notice Generation...')
  
  // Test validation
  const validation = validateFormData(testFormData)
  console.log('Validation result:', validation)
  
  // Test text generation
  const noticeText = generateNoticeText(testFormData)
  console.log('Generated notice text:', noticeText)
  
  // Test filename generation
  const filename = generateFileName(testFormData)
  console.log('Generated filename:', filename)
  
  return {
    validation,
    noticeText,
    filename
  }
}

// Export test function for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testNoticeGeneration = testNoticeGeneration
}
