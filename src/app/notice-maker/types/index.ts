/**
 * Type definitions for the Notice Maker application
 */

export interface NoticeFormData {
  place: string
  guardianInitial: string
  guardianName: string
  guardianStatus: boolean // true = പരേതനായ (deceased male), false = alive
  relation: 'മകൻ' | 'മകൾ' | 'ഭാര്യ'
  deceasedInitial: string
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

export type GuardianStatus = boolean // true = പരേതനായ (deceased male), false = alive
export type Relation = NoticeFormData['relation']
export type Gender = NoticeFormData['deceasedGender']
