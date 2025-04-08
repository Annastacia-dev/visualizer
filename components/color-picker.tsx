"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Palette } from "lucide-react"

const PRESET_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ff6b6b",
  "#48dbfb",
  "#1dd1a1",
  "#5f27cd",
  "#576574",
  "#222f3e",
  "#ee5253",
  "#0abde3",
  "#10ac84",
  "#341f97",
  "#8395a7",
  "#1e272e",
]

type ColorPickerProps = {
  onChange: (colors: string[]) => void
  initialColors?: string[]
}

export function ColorPicker({ onChange, initialColors = PRESET_COLORS.slice(0, 6) }: ColorPickerProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors)

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...selectedColors]
    newColors[index] = color
    setSelectedColors(newColors)
    onChange(newColors)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span>Customize Colors</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Chart Colors</h4>
          <div className="grid grid-cols-6 gap-2">
            {PRESET_COLORS.map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (selectedColors.includes(color)) {
                    setSelectedColors(selectedColors.filter((c) => c !== color))
                  } else if (selectedColors.length < 6) {
                    setSelectedColors([...selectedColors, color])
                  }
                  onChange(selectedColors)
                }}
              >
                {selectedColors.includes(color) && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Selected Colors</h4>
            <div className="flex gap-2">
              {selectedColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
