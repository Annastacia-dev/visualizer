"use client"

import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoldersContext, NewFileDialog } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ChevronRight, File, Home, Upload } from "lucide-react"
import Link from "next/link"

export default function AllFilesPage() {
  const { folders } = useContext(FoldersContext)
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)

  // Function to flatten the file structure for display
  const flattenFiles = (folders, path = "") => {
    let result = []

    folders.forEach((folder) => {
      const currentPath = path ? `${path} > ${folder.name}` : folder.name

      if (folder.files?.length) {
        folder.files.forEach((file) => {
          result.push({
            id: file.id,
            name: file.name,
            path: currentPath,
            folderId: folder.id,
          })
        })
      }

      if (folder.folders?.length) {
        result = [...result, ...flattenFiles(folder.folders, currentPath)]
      }
    })

    return result
  }

  const allFiles = flattenFiles(folders)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mb-6">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">All Files</span>
        </nav>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Files</h2>
        <Button onClick={() => setShowNewFileDialog(true)}>
          <Upload className="mr-2 h-4 w-4" />
          New File
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allFiles.map((file) => (
          <Link key={file.id} href={`/projects/${file.folderId}/files/${file.id}`}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  <File className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">Located in: {file.path}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allFiles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <File className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              You don't have any files yet. Create a file to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <NewFileDialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog} />
    </div>
  )
}
