"use client"

import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoldersContext, NewFolderDialog } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Folder, FolderPlus, Home } from "lucide-react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function AllFoldersPage() {
  const { folders } = useContext(FoldersContext)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)

  // Function to flatten the folder structure for display
  const flattenFolders = (folders, path = "") => {
    let result = []

    folders.forEach((folder) => {
      const currentPath = path ? `${path} > ${folder.name}` : folder.name
      result.push({
        id: folder.id,
        name: folder.name,
        path: currentPath,
        fileCount: folder.files?.length || 0,
      })

      if (folder.folders?.length) {
        result = [...result, ...flattenFolders(folder.folders, currentPath)]
      }
    })

    return result
  }

  const allFolders = flattenFolders(folders)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mb-6">
        <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">All Folders</span>
        </nav>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Folders</h2>
        <Button onClick={() => setShowNewFolderDialog(true)}>
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allFolders.map((folder) => (
          <Link key={folder.id} href={`/projects/${folder.id}`}>
            <Card className="hover:bg-muted/50 transition-colors h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{folder.name}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">{folder.path}</div>
                <p className="text-sm mb-4">Contains {folder.fileCount} files</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {allFolders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Folder className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              You don't have any folders yet. Create a folder to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <NewFolderDialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog} />
    </div>
  )
}
