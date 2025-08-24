/**
 * Test file to verify the modular Notice Maker structure
 * This file can be used for debugging and verification
 */

import { 
  NoticeFormData, 
  INITIAL_FORM_DATA, 
  generateNoticeText, 
  validateFormData,
  generateFileName,
  getGenderFromRelation
} from './index'

// Test data for different relations
const testFormDataSon: NoticeFormData = {
  ...INITIAL_FORM_DATA,
  place: 'കോഴിക്കോട്',
  guardianName: 'അഹമ്മദ്',
  relation: 'മകൻ', // Son - should be male
  deceasedName: 'മുഹമ്മദ്',
  date: new Date('2024-01-15')
}

const testFormDataDaughter: NoticeFormData = {
  ...INITIAL_FORM_DATA,
  place: 'കോഴിക്കോട്',
  guardianName: 'അഹമ്മദ്',
  relation: 'മകൾ', // Daughter - should be female
  deceasedName: 'ഫാത്തിമ',
  date: new Date('2024-01-15')
}

const testFormDataWife: NoticeFormData = {
  ...INITIAL_FORM_DATA,
  place: 'കോഴിക്കോട്',
  guardianName: 'അഹമ്മദ്',
  relation: 'ഭാര്യ', // Wife - should be female
  deceasedName: 'ആമിന',
  date: new Date('2024-01-15')
}

// Test functions (for debugging purposes)
export function testNoticeGeneration() {
  console.log('Testing Notice Generation...')
  
  // Test gender detection logic
  console.log('\n=== Testing Gender Detection ===')
  console.log('മകൻ (Son) -> Gender:', getGenderFromRelation('മകൻ'))
  console.log('മകൾ (Daughter) -> Gender:', getGenderFromRelation('മകൾ'))
  console.log('ഭാര്യ (Wife) -> Gender:', getGenderFromRelation('ഭാര്യ'))
  
  // Test different relations
  console.log('\n=== Testing Son (മകൻ) ===')
  const sonResult = {
    validation: validateFormData(testFormDataSon),
    noticeText: generateNoticeText(testFormDataSon),
    filename: generateFileName(testFormDataSon)
  }
  console.log('Son result:', sonResult)
  
  console.log('\n=== Testing Daughter (മകൾ) ===')
  const daughterResult = {
    validation: validateFormData(testFormDataDaughter),
    noticeText: generateNoticeText(testFormDataDaughter),
    filename: generateFileName(testFormDataDaughter)
  }
  console.log('Daughter result:', daughterResult)
  
  console.log('\n=== Testing Wife (ഭാര്യ) ===')
  const wifeResult = {
    validation: validateFormData(testFormDataWife),
    noticeText: generateNoticeText(testFormDataWife),
    filename: generateFileName(testFormDataWife)
  }
  console.log('Wife result:', wifeResult)
  
  return {
    son: sonResult,
    daughter: daughterResult,
    wife: wifeResult
  }
}

// Export test function for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testNoticeGeneration = testNoticeGeneration
}
