"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { Upload, FileType, FileUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DataProcessor } from "@/components/data-processor"

export function FileUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      })
      return
    }

    setFile(file)
    toast({
      title: "File uploaded",
      description: `Successfully uploaded ${file.name}`,
    })
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("csv")) return <FileType className="h-8 w-8 text-green-500" />
    if (fileType.includes("excel") || fileType.includes("sheet")) return <FileType className="h-8 w-8 text-green-500" />
    return <FileUp className="h-8 w-8" />
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Your Data</CardTitle>
        <CardDescription>Drag and drop your CSV or Excel file, or click to browse</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          {file ? (
            <div className="flex flex-col items-center gap-2">
              {getFileIcon(file.type)}
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Drop your file here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">Supports CSV and Excel files</p>
            </>
          )}
          <input id="file-upload" type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleFileChange} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">{file && <DataProcessor file={file} />}</CardFooter>
    </Card>
  )
}
