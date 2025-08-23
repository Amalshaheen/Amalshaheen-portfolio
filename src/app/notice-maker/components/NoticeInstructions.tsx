import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Instructions component for the Notice Maker
 */
export function NoticeInstructions() {
  return (
    <Card>
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
  )
}
