import { NoticeFormData } from '../types'

/**
 * Constants for the Notice Maker application
 */

export const INITIAL_FORM_DATA: NoticeFormData = {
  place: '',
  guardianName: '',
  guardianStatus: 'alive',
  relation: 'മകൻ',
  deceasedName: '',
  deceasedGender: 'male', // Matches default relation 'മകൻ' (Son)
  date: undefined
}

export const MALAYALAM_DAYS = [
  'ഞായര്‍',
  'തിങ്കള്‍', 
  'ചൊവ്വ',
  'ബുധന്‍',
  'വ്യാഴം',
  'വെള്ളി',
  'ശനി'
] as const

export const GUARDIAN_STATUS_OPTIONS = [
  { value: 'alive', label: 'Alive' },
  { value: 'deceased-male', label: 'Deceased Male' },
  { value: 'deceased-female', label: 'Deceased Female' }
] as const

export const RELATION_OPTIONS = [
  { value: 'മകൻ', label: 'മകൻ (Son)' },
  { value: 'മകൾ', label: 'മകൾ (Daughter)' },
  { value: 'ഭാര്യ', label: 'ഭാര്യ (Wife)' }
] as const

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
] as const

export const PRINT_SETTINGS = {
  PAGE_SIZE: 'A4 landscape',
  DIMENSIONS: '297mm × 210mm',
  GRID_LAYOUT: '2×2',
  COPIES_PER_PAGE: 4
} as const
