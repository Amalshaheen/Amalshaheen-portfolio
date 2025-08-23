/**
 * Type definitions for the Notice Maker application
 */

export interface NoticeFormData {
  place: string
  guardianName: string
  guardianStatus: 'alive' | 'deceased-male' | 'deceased-female'
  relation: 'മകൻ' | 'മകൾ' | 'ഭാര്യ'
  deceasedName: string
  deceasedGender: 'male' | 'female'
  date: Date | undefined
}

export interface NoticeContent {
  greeting: string
  mainText: string
  footerLine1: string
  footerLine2: string
}

export interface HTMLGenerationOptions {
  title?: string
  includeStyles?: boolean
}

export type GuardianStatus = NoticeFormData['guardianStatus']
export type Relation = NoticeFormData['relation']
export type Gender = NoticeFormData['deceasedGender']
