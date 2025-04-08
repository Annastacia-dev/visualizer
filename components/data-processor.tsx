"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { parseFile } from "@/lib/parse-data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface DataProcessorProps {
  file: File
  onProcessed?: (data: any[], columns: string[]) => void
}

export function DataProcessor({ file, onProcessed }: DataProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const processFile = async () => {
    setIsProcessing(true)
    setProgress(10)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 300)

      // Parse the file
      const { data, columns } = await parseFile(file)

      clearInterval(progressInterval)
      setProgress(100)

      // Call the onProcessed callback if provided
      if (onProcessed) {
        onProcessed(data, columns)
      }

      // Store data in localStorage (in a real app, we might use a more robust solution)
      localStorage.setItem("visualizerData", JSON.stringify(data))
      localStorage.setItem("visualizerColumns", JSON.stringify(columns))

      // Show success toast
      toast({
        title: "Data processed successfully",
        description: `Found ${data.length} records with ${columns.length} columns`,
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Error processing file:", error)
      toast({
        title: "Error processing file",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Processing {file.name}... {progress}%
          </p>
        </div>
      )}

      <Button onClick={processFile} disabled={isProcessing} className="w-full">
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Analyze Data"
        )}
      </Button>
    </div>
  )
}
