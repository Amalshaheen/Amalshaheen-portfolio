import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, Plus, RotateCcw, Type } from 'lucide-react'

interface FontControlsProps {
  onFontSizeChange?: (sizes: FontSizes) => void
}

interface FontSizes {
  base: number
  greeting: number
  footer: number
}

const DEFAULT_SIZES: FontSizes = {
  base: 13,
  greeting: 14,
  footer: 12
}

/**
 * Optional font controls component for manual font size adjustments
 */
export function FontControls({ onFontSizeChange }: FontControlsProps) {
  const [fontSizes, setFontSizes] = useState<FontSizes>(DEFAULT_SIZES)
  const [isVisible, setIsVisible] = useState(false)

  const adjustFontSize = (type: keyof FontSizes, delta: number) => {
    const minSize = 8
    const maxSize = 20
    
    const newSizes = {
      ...fontSizes,
      [type]: Math.max(minSize, Math.min(maxSize, fontSizes[type] + delta))
    }
    
    setFontSizes(newSizes)
    onFontSizeChange?.(newSizes)
  }

  const resetFontSizes = () => {
    setFontSizes(DEFAULT_SIZES)
    onFontSizeChange?.(DEFAULT_SIZES)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="font-controls-container">
      <Button
        onClick={toggleVisibility}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        <Type className="mr-2 h-4 w-4" />
        {isVisible ? 'Hide Font Controls' : 'Show Font Controls'}
      </Button>

      {isVisible && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-sm">Font Size Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Base Font Size */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Main Text:</span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => adjustFontSize('base', -1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.base <= 8}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm min-w-[40px] text-center">
                  {fontSizes.base}pt
                </span>
                <Button
                  onClick={() => adjustFontSize('base', 1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.base >= 20}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Greeting Font Size */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Greeting:</span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => adjustFontSize('greeting', -1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.greeting <= 8}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm min-w-[40px] text-center">
                  {fontSizes.greeting}pt
                </span>
                <Button
                  onClick={() => adjustFontSize('greeting', 1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.greeting >= 20}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Footer Font Size */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Footer:</span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => adjustFontSize('footer', -1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.footer <= 8}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm min-w-[40px] text-center">
                  {fontSizes.footer}pt
                </span>
                <Button
                  onClick={() => adjustFontSize('footer', 1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSizes.footer >= 20}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-2">
              <Button
                onClick={resetFontSizes}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-3 w-3" />
                Reset to Default
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              💡 Automatic scaling applies for long text content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
