import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { NoticeFormData } from '../types'
import { GUARDIAN_STATUS_OPTIONS, RELATION_OPTIONS, GENDER_OPTIONS, MALAYALAM_DAYS } from '../constants'

interface NoticeFormProps {
  formData: NoticeFormData
  onFormDataChange: (field: keyof NoticeFormData, value: any) => void
}

/**
 * Form component for collecting notice details
 */
export function NoticeForm({ formData, onFormDataChange }: NoticeFormProps) {
  return (
    <div className="space-y-6">
      {/* Place */}
      <FormField
        id="place"
        label="Place *"
        placeholder="Enter place name"
        value={formData.place}
        onChange={(value) => onFormDataChange('place', value)}
      />

      {/* Guardian Name */}
      <FormField
        id="guardianName"
        label="Guardian Name *"
        placeholder="Enter guardian name"
        value={formData.guardianName}
        onChange={(value) => onFormDataChange('guardianName', value)}
      />

      {/* Guardian Status */}
      <FormSelect
        label="Guardian Status *"
        value={formData.guardianStatus}
        options={GUARDIAN_STATUS_OPTIONS}
        onValueChange={(value) => onFormDataChange('guardianStatus', value)}
      />

      {/* Relation */}
      <FormSelect
        label="Relation *"
        value={formData.relation}
        options={RELATION_OPTIONS}
        onValueChange={(value) => onFormDataChange('relation', value)}
      />

      {/* Deceased Name */}
      <FormField
        id="deceasedName"
        label="Deceased Name *"
        placeholder="Enter deceased person's name"
        value={formData.deceasedName}
        onChange={(value) => onFormDataChange('deceasedName', value)}
      />

      {/* Deceased Gender */}
      <FormSelect
        label="Deceased Gender *"
        value={formData.deceasedGender}
        options={GENDER_OPTIONS}
        onValueChange={(value) => onFormDataChange('deceasedGender', value)}
      />

      {/* Date */}
      <DatePicker
        label="Date *"
        date={formData.date}
        onDateChange={(date) => onFormDataChange('date', date)}
      />
    </div>
  )
}

interface FormFieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

function FormField({ id, label, placeholder, value, onChange }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

interface FormSelectProps {
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onValueChange: (value: string) => void
}

function FormSelect({ label, value, options, onValueChange }: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

interface DatePickerProps {
  label: string
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

function DatePicker({ label, date, onDateChange }: DatePickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <p className="text-sm text-muted-foreground">
          Day: {MALAYALAM_DAYS[date.getDay()]}
        </p>
      )}
    </div>
  )
}
