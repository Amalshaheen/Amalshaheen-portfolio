import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Instructions component for the Notice Maker
 */
export function NoticeInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>നിർദ്ദേശങ്ങൾ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <ul className="space-y-2">
            <li>മരണക്കത്ത് തയ്യാറാക്കാൻ (*) ചിഹ്നമുള്ള എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക</li>
            <li>നിങ്ങൾ ടൈപ്പ് ചെയ്യുമ്പോൾ കത്തിന്‍റെ ഉള്ളടക്കം സ്വയം അപ്‌ഡേറ്റ് ആകും</li>
            <li><strong>"Open Print Preview"</strong> - പ്രിന്റിങ്ങിനായി 4 കോപ്പികളുമായി പുതിയ വിൻഡോ തുറക്കുന്നു</li>
            <li><strong>"HTML ഫയൽ ഡൗൺലോഡ് ചെയ്യുക"</strong> - പിന്നീട് തുറന്ന് പ്രിന്റ് ചെയ്യാവുന്ന HTML ഫയൽ ഡൗൺലോഡ് ചെയ്യുന്നു</li>
            <li>മികച്ച ഫലത്തിനായി പ്രിന്റർ <strong>A4 ലാൻഡ്‌സ്കേപ്പ് മോഡിൽ</strong> സജ്ജീകരിക്കുക</li>
            <li>പ്രിന്റിങ്ങിന് ശേഷം എളുപ്പത്തിൽ മുറിക്കാനായി ഓരോ മരണക്കത്തും ബോർഡറിനാൽ ചുറ്റപ്പെട്ടിരിക്കുന്നു</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
