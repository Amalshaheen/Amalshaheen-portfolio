import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Asterisk, Edit, Printer, Download, Monitor, Scissors } from 'lucide-react';

const instructions = [
  {
    icon: <Asterisk className="h-5 w-5 text-primary" />,
    text: 'മരണക്കത്ത് തയ്യാറാക്കാൻ (*) ചിഹ്നമുള്ള എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക',
  },
  {
    icon: <Edit className="h-5 w-5 text-primary" />,
    text: 'നിങ്ങൾ ടൈപ്പ് ചെയ്യുമ്പോൾ കത്തിന്‍റെ ഉള്ളടക്കം സ്വയം അപ്‌ഡേറ്റ് ആകും',
  },
  {
    icon: <Printer className="h-5 w-5 text-primary" />,
    text: '<strong>"Open Print Preview"</strong> - പ്രിന്റിങ്ങിനായി 4 കോപ്പികളുമായി പുതിയ വിൻഡോ തുറക്കുന്നു',
  },
  {
    icon: <Download className="h-5 w-5 text-primary" />,
    text: '<strong>"HTML ഫയൽ ഡൗൺലോഡ് ചെയ്യുക"</strong> - പിന്നീട് തുറന്ന് പ്രിന്റ് ചെയ്യാവുന്ന HTML ഫയൽ ഡൗൺലോഡ് ചെയ്യുന്നു',
  },
  {
    icon: <Monitor className="h-5 w-5 text-primary" />,
    text: 'മികച്ച ഫലത്തിനായി പ്രിന്റർ <strong>A4 ലാൻഡ്‌സ്കേപ്പ് മോഡിൽ</strong> സജ്ജീകരിക്കുക',
  },
  {
    icon: <Scissors className="h-5 w-5 text-primary" />,
    text: 'പ്രിന്റിങ്ങിന് ശേഷം എളുപ്പത്തിൽ മുറിക്കാനായി ഓരോ മരണക്കത്തും ബോർഡറിനാൽ ചുറ്റപ്പെട്ടിരിക്കുന്നു',
  },
];

/**
 * Instructions component for the Notice Maker
 */
export function NoticeInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>നിർദ്ദേശങ്ങൾ (Instructions)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {instructions.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{item.icon}</div>
              <p 
                className="text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
