'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Download, Printer } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface NoticeFormData {
  place: string
  guardianName: string
  guardianStatus: 'alive' | 'deceased-male' | 'deceased-female'
  relation: 'മകൻ' | 'മകൾ' | 'ഭാര്യ'
  deceasedName: string
  deceasedGender: 'male' | 'female'
  date: Date | undefined
}

const initialFormData: NoticeFormData = {
  place: '',
  guardianName: '',
  guardianStatus: 'alive',
  relation: 'മകൻ',
  deceasedName: '',
  deceasedGender: 'male',
  date: undefined
}

export default function NoticeMakerPage() {
  const [formData, setFormData] = useState<NoticeFormData>(initialFormData)
  const [noticeText, setNoticeText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrintPreview, setShowPrintPreview] = useState(false)

  // Malayalam day names
  const malayalamDays = [
    'ഞായറാഴ്‌ച',
    'തിങ്കളാഴ്‌ച', 
    'ചൊവ്വാഴ്ച',
    'ബുധനാഴ്ച',
    'വ്യാഴാഴ്ച',
    'വെള്ളിയാഴ്ച',
    'ശനിയാഴ്ച'
  ]

  // Generate notice text based on form data
  useEffect(() => {
    if (formData.place && formData.guardianName && formData.deceasedName && formData.date) {
      const guardianPrefix = formData.guardianStatus === 'alive' 
        ? '' 
        : formData.guardianStatus === 'deceased-male' 
          ? 'പരേതനായ ' 
          : 'പരേതയായ '
      
      const deceasedPossessive = formData.deceasedGender === 'male' 
        ? 'പരേതന്റെ' 
        : 'പരേതയുടെ'
      
      const dayOfWeek = malayalamDays[formData.date.getDay()]
      const formattedDate = format(formData.date, 'dd/MM/yyyy')
      
      const notice = `അസ്സലാമു അലൈകും


${formData.place}-${guardianPrefix}${formData.guardianName} സ്വദേശി ${guardianPrefix}${formData.guardianName} എന്നവരുടെ ${formData.relation} ${formData.deceasedName} എന്നവർ ${formattedDate} ന് (${dayOfWeek}) മരണപ്പെട്ട വിവരം അറിയിക്കുന്നതോടൊപ്പം ${deceasedPossessive} പേരിൽ ജനാസ നിസ്‌കരിക്കാനും പ്രാർത്തിക്കാനും അഭ്യർത്ഥിക്കുന്നു.


${formData.place}-${guardianPrefix}${formData.guardianName}                എന്ന്
${formattedDate}                കുടുംബാംഗങ്ങൾ`

      setNoticeText(notice)
    } else {
      setNoticeText('')
    }
  }, [formData])

  const handleInputChange = (field: keyof NoticeFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateHTML = () => {
    if (!noticeText) {
      alert('Please fill all required fields first')
      return
    }

    setIsGenerating(true)
    
    const generateNoticeHTML = () => {
      const lines = noticeText.split('\n').filter(line => line.trim() !== '')
      if (lines.length < 4) {
        return `<div class="notice-content">${noticeText.split('\n').join('<br>')}</div>`
      }
      
      const greeting = lines[0] // "അസ്സലാമു അലൈകും"
      const mainText = lines[1] // Main notice text
      const footerLine1 = lines[2] // Place + signature
      const footerLine2 = lines[3] // Date + family
      
      // Extract left and right parts from footer by splitting on multiple spaces
      const footerParts1 = footerLine1.split(/\s{16,}/) // Split on 16+ spaces
      const footerParts2 = footerLine2.split(/\s{16,}/)
      
      const leftPart1 = footerParts1[0] || ''
      const rightPart1 = footerParts1[1] || ''
      const leftPart2 = footerParts2[0] || ''
      const rightPart2 = footerParts2[1] || ''
      
      return `
        <div style="display: flex; flex-direction: column; height: 100%; padding: 2mm; font-size: 11pt; line-height: 1.6; color: #000; font-weight: 500;">
          <div style="text-align: center; margin-bottom: 8mm; font-size: 12pt; font-weight: 600;">${greeting}</div>
          <div style="text-align: justify; text-align-last: center; margin-bottom: 8mm; flex: 1; display: flex; align-items: center; justify-content: center; line-height: 1.8;">${mainText}</div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; font-size: 10pt;">
            <div style="text-align: left; line-height: 1.4;">
              <div>${leftPart1}</div>
              <div>${leftPart2}</div>
            </div>
            <div style="text-align: right; line-height: 1.4;">
              <div>${rightPart1}</div>
              <div>${rightPart2}</div>
            </div>
          </div>
        </div>`
    }

    try {
      const htmlContent = `
<!DOCTYPE html>
<html lang="ml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notice - ${format(formData.date!, 'yyyy-MM-dd')}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600&display=swap');
        
        /* CSS Page Rule for strict A4 Landscape */
        @page {
            size: A4 landscape;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Malayalam', 'Arial', sans-serif;
            background: white;
            margin: 0;
            padding: 0;
        }
        
        /* A4 Landscape: 297mm x 210mm */
        .page {
            width: 297mm;
            height: 210mm;
            background: white;
            margin: 0 auto;
            padding: 10mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 5mm;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .notice-box {
            border: 2px solid #000;
            padding: 8mm;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: white;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .notice-content {
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            font-weight: 500;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
        }
        
        /* Cut line indicators */
        .notice-box::before {
            content: '';
            position: absolute;
            top: -1mm;
            left: 50%;
            transform: translateX(-50%);
            width: 8mm;
            height: 1px;
            background: #666;
            opacity: 0.7;
        }
        
        .notice-box::after {
            content: '';
            position: absolute;
            left: -1mm;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 8mm;
            background: #666;
            opacity: 0.7;
        }
        
        /* Print styles - strict A4 enforcement */
        @media print {
            html, body {
                width: 297mm;
                height: 210mm;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            
            .page {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 10mm !important;
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            
            .notice-box {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .no-print {
                display: none !important;
            }
            
            /* Ensure exact A4 dimensions */
            @page {
                size: A4 landscape;
                margin: 0mm;
            }
        }
        
        /* Screen preview styles */
        @media screen {
            body {
                background: #f5f5f5;
                padding: 20px;
            }
            
            .page {
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border: 1px solid #ddd;
            }
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .print-button:hover {
            background: #0056b3;
        }
        
        .header-note {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            max-width: 297mm;
            margin-left: auto;
            margin-right: auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dimensions-info {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="no-print header-note">
        <strong>A4 Landscape Notice Layout</strong><br>
        Dimensions: 297mm × 210mm | Set printer to A4 Landscape mode<br>
        Cut along the borders after printing for individual notices
    </div>
    
    <button class="print-button no-print" onclick="window.print()">
        🖨️ Print A4 Landscape
    </button>
    
    <div class="dimensions-info no-print">
        A4: 297×210mm | 4 notices
    </div>
    
    <div class="page">
        <div class="notice-box">
            ${generateNoticeHTML()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTML()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTML()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTML()}
        </div>
    </div>
</body>
</html>`

      // Create a new window with the HTML content
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // Wait for fonts to load before showing print dialog
        setTimeout(() => {
          printWindow.focus()
        }, 1000)
      } else {
        // Fallback: create a downloadable HTML file
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `notice-${format(formData.date!, 'yyyy-MM-dd')}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error generating HTML:', error)
      alert('Error generating HTML. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generatePrintableHTML = () => {
    if (!noticeText) {
      alert('Please fill all required fields first')
      return
    }

    const generateNoticeHTMLForPrint = () => {
      const lines = noticeText.split('\n').filter(line => line.trim() !== '')
      if (lines.length < 4) {
        return `<div style="display: flex; flex-direction: column; height: 100%; padding: 2mm; font-size: 11pt; line-height: 1.6; color: #000; font-weight: 500;">${noticeText.split('\n').join('<br>')}</div>`
      }
      
      const greeting = lines[0] // "അസ്സലാമു അലൈകും"
      const mainText = lines[1] // Main notice text
      const footerLine1 = lines[2] // Place + signature
      const footerLine2 = lines[3] // Date + family
      
      // Extract left and right parts from footer by splitting on multiple spaces
      const footerParts1 = footerLine1.split(/\s{16,}/) // Split on 16+ spaces
      const footerParts2 = footerLine2.split(/\s{16,}/)
      
      const leftPart1 = footerParts1[0] || ''
      const rightPart1 = footerParts1[1] || ''
      const leftPart2 = footerParts2[0] || ''
      const rightPart2 = footerParts2[1] || ''
      
      return `
        <div style="display: flex; flex-direction: column; height: 100%; padding: 2mm; font-size: 11pt; line-height: 1.6; color: #000; font-weight: 500;">
          <div style="text-align: center; margin-bottom: 8mm; font-size: 12pt; font-weight: 600;">${greeting}</div>
          <div style="text-align: justify; text-align-last: center; margin-bottom: 8mm; flex: 1; display: flex; align-items: center; justify-content: center; line-height: 1.8;">${mainText}</div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; font-size: 10pt;">
            <div style="text-align: left; line-height: 1.4;">
              <div>${leftPart1}</div>
              <div>${leftPart2}</div>
            </div>
            <div style="text-align: right; line-height: 1.4;">
              <div>${rightPart1}</div>
              <div>${rightPart2}</div>
            </div>
          </div>
        </div>`
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="ml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notice - ${format(formData.date!, 'yyyy-MM-dd')}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;500;600&display=swap');
        
        /* CSS Page Rule for strict A4 Landscape */
        @page {
            size: A4 landscape;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Malayalam', 'Arial', sans-serif;
            background: white;
            margin: 0;
            padding: 0;
        }
        
        /* A4 Landscape: 297mm x 210mm */
        .page {
            width: 297mm;
            height: 210mm;
            background: white;
            margin: 0 auto;
            padding: 10mm;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 5mm;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .notice-box {
            border: 2px solid #000;
            padding: 8mm;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: white;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        
        .notice-content {
            font-size: 11pt;
            line-height: 1.6;
            color: #000;
            font-weight: 500;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
        }
        
        /* Cut line indicators */
        .notice-box::before {
            content: '';
            position: absolute;
            top: -1mm;
            left: 50%;
            transform: translateX(-50%);
            width: 8mm;
            height: 1px;
            background: #666;
            opacity: 0.7;
        }
        
        .notice-box::after {
            content: '';
            position: absolute;
            left: -1mm;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 8mm;
            background: #666;
            opacity: 0.7;
        }
        
        /* Print styles - strict A4 enforcement */
        @media print {
            html, body {
                width: 297mm;
                height: 210mm;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            
            .page {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 10mm !important;
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            
            .notice-box {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .no-print {
                display: none !important;
            }
            
            /* Ensure exact A4 dimensions */
            @page {
                size: A4 landscape;
                margin: 0mm;
            }
        }
        
        /* Screen preview styles */
        @media screen {
            body {
                background: #f5f5f5;
                padding: 20px;
            }
            
            .page {
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border: 1px solid #ddd;
            }
        }
        
        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .print-button:hover {
            background: #0056b3;
        }
        
        .header-note {
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
            max-width: 297mm;
            margin-left: auto;
            margin-right: auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dimensions-info {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="no-print header-note">
        <strong>A4 Landscape Notice Layout</strong><br>
        Dimensions: 297mm × 210mm | Set printer to A4 Landscape mode<br>
        Cut along the borders after printing for individual notices
    </div>
    
    <button class="print-button no-print" onclick="window.print()">
        🖨️ Print A4 Landscape
    </button>
    
    <div class="dimensions-info no-print">
        A4: 297×210mm | 4 notices
    </div>
    
    <div class="page">
        <div class="notice-box">
            ${generateNoticeHTMLForPrint()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTMLForPrint()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTMLForPrint()}
        </div>
        
        <div class="notice-box">
            ${generateNoticeHTMLForPrint()}
        </div>
    </div>
</body>
</html>`

    // Create a downloadable HTML file
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `notice-${format(formData.date!, 'yyyy-MM-dd')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Notice Maker</h1>
          <p className="text-muted-foreground">Create Malayalam death notices with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Notice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Place */}
              <div className="space-y-2">
                <Label htmlFor="place">Place *</Label>
                <Input
                  id="place"
                  value={formData.place}
                  onChange={(e) => handleInputChange('place', e.target.value)}
                  placeholder="Enter place name"
                />
              </div>

              {/* Guardian Name */}
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  placeholder="Enter guardian name"
                />
              </div>

              {/* Guardian Status */}
              <div className="space-y-2">
                <Label>Guardian Status *</Label>
                <Select 
                  value={formData.guardianStatus} 
                  onValueChange={(value) => handleInputChange('guardianStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alive">Alive</SelectItem>
                    <SelectItem value="deceased-male">Deceased Male</SelectItem>
                    <SelectItem value="deceased-female">Deceased Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Relation */}
              <div className="space-y-2">
                <Label>Relation *</Label>
                <Select 
                  value={formData.relation} 
                  onValueChange={(value) => handleInputChange('relation', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="മകൻ">മകൻ (Son)</SelectItem>
                    <SelectItem value="മകൾ">മകൾ (Daughter)</SelectItem>
                    <SelectItem value="ഭാര്യ">ഭാര്യ (Wife)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deceased Name */}
              <div className="space-y-2">
                <Label htmlFor="deceasedName">Deceased Name *</Label>
                <Input
                  id="deceasedName"
                  value={formData.deceasedName}
                  onChange={(e) => handleInputChange('deceasedName', e.target.value)}
                  placeholder="Enter deceased person's name"
                />
              </div>

              {/* Deceased Gender */}
              <div className="space-y-2">
                <Label>Deceased Gender *</Label>
                <Select 
                  value={formData.deceasedGender} 
                  onValueChange={(value) => handleInputChange('deceasedGender', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange('date', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formData.date && (
                  <p className="text-sm text-muted-foreground">
                    Day: {malayalamDays[formData.date.getDay()]}
                  </p>
                )}
              </div>

              {/* Generate HTML Button */}
              <div className="space-y-3">
                <Button 
                  onClick={generateHTML} 
                  className="w-full" 
                  disabled={!noticeText || isGenerating}
                  size="lg"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Open Print Preview'}
                </Button>
                
                <Button 
                  onClick={generatePrintableHTML} 
                  className="w-full" 
                  variant="outline"
                  disabled={!noticeText}
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML File
                </Button>
              </div>
              
              {!noticeText && (
                <p className="text-sm text-muted-foreground text-center">
                  Please fill all required fields to enable HTML generation
                </p>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {noticeText ? (
                <div className="bg-white text-black p-8 rounded-lg border-2 border-gray-400 shadow-lg">
                  <div className="border-2 border-black p-6 rounded">
                    <pre className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-center font-medium">
                      {noticeText}
                    </pre>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 text-center">
                    Preview - PDF will contain 4 copies arranged in 2×2 grid
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 text-gray-500 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center min-h-[300px] flex items-center justify-center">
                  <div>
                    <p className="text-lg font-medium mb-2">Fill the form to see preview</p>
                    <p className="text-sm">Your notice will appear here as you type</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ul className="space-y-2">
                <li>Fill all the required fields marked with (*) to generate the notice</li>
                <li>The preview will update automatically as you type</li>
                <li><strong>"Open Print Preview"</strong> - Opens a new window with 4 copies ready for printing</li>
                <li><strong>"Download HTML File"</strong> - Downloads an HTML file you can open and print later</li>
                <li>Set your printer to <strong>A4 Landscape mode</strong> for best results</li>
                <li>Each notice is surrounded by a border for easy cutting after printing</li>
                <li>Uses Noto Sans Malayalam font for perfect Malayalam text rendering</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
