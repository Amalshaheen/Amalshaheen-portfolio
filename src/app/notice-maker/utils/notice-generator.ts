import { format } from 'date-fns'
import { NoticeFormData, NoticeContent } from '../types'
import { MALAYALAM_DAYS } from '../constants'

/**
 * Utility functions for generating Malayalam notices
 */

/**
 * Generate Malayalam notice text from form data
 */
export function generateNoticeText(formData: NoticeFormData): string {
  if (!formData.place || !formData.guardianName || !formData.deceasedName || !formData.date) {
    return ''
  }

  const guardianPrefix = getGuardianPrefix(formData.guardianStatus)
  const deceasedPossessive = getDeceasedPossessive(formData.deceasedGender)
  const dayOfWeek = MALAYALAM_DAYS[formData.date.getDay()]
  const formattedDate = format(formData.date, 'dd/MM/yyyy')
  
  return `അസ്സലാമു അലൈകും


${formData.place}-${guardianPrefix}${formData.guardianName} സ്വദേശി ${guardianPrefix}${formData.guardianName} എന്നവരുടെ ${formData.relation} ${formData.deceasedName} എന്നവർ ${formattedDate} ന് (${dayOfWeek}) മരണപ്പെട്ട വിവരം അറിയിക്കുന്നതോടൊപ്പം ${deceasedPossessive} പേരിൽ ജനാസ നിസ്‌കരിക്കാനും പ്രാർത്തിക്കാനും അഭ്യർത്ഥിക്കുന്നു.


${formData.place}-${guardianPrefix}${formData.guardianName}                എന്ന്
${formattedDate}                കുടുംബാംഗങ്ങൾ`
}

/**
 * Parse notice text into structured content
 */
export function parseNoticeContent(noticeText: string): NoticeContent | null {
  const lines = noticeText.split('\n').filter(line => line.trim() !== '')
  
  if (lines.length < 4) {
    return null
  }
  
  return {
    greeting: lines[0],
    mainText: lines[1],
    footerLine1: lines[2],
    footerLine2: lines[3]
  }
}

/**
 * Get the appropriate guardian prefix based on status
 */
function getGuardianPrefix(status: NoticeFormData['guardianStatus']): string {
  switch (status) {
    case 'alive':
      return ''
    case 'deceased-male':
      return 'പരേതനായ '
    case 'deceased-female':
      return 'പരേതയായ '
    default:
      return ''
  }
}

/**
 * Get the appropriate possessive form for the deceased
 */
function getDeceasedPossessive(gender: NoticeFormData['deceasedGender']): string {
  return gender === 'male' ? 'പരേതന്റെ' : 'പരേതയുടെ'
}

/**
 * Validate form data for completeness
 */
export function validateFormData(formData: NoticeFormData): {
  isValid: boolean
  missingFields: string[]
} {
  const requiredFields: Array<keyof NoticeFormData> = [
    'place',
    'guardianName',
    'deceasedName',
    'date'
  ]
  
  const missingFields = requiredFields.filter(field => {
    const value = formData[field]
    return !value || (typeof value === 'string' && value.trim() === '')
  })
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}

/**
 * Generate filename for download based on form data
 */
export function generateFileName(formData: NoticeFormData): string {
  const date = formData.date ? format(formData.date, 'yyyy-MM-dd') : 'notice'
  const place = formData.place ? `-${formData.place.replace(/\s+/g, '-')}` : ''
  return `notice-${date}${place}.html`
}
