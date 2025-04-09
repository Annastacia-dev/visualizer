"use client"

import { useContext, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoldersContext, NewFolderDialog, NewFileDialog } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { File, Folder, FolderPlus, Upload } from "lucide-react"
import Link from "next/link"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export default function ProjectPage() {
  const params = useParams()
  const { folderId } = params
  const { getFolderById } = useContext(FoldersContext)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)

  const folder = getFolderById(folderId)

  if (!folder) {
    return (
      <div className="flex-1 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Project not found</h2>
        <p className="mt-4">The project you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mb-6">
        <BreadcrumbNav folderId={folderId} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{folder.name}</h2>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewFolderDialog(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button onClick={() => setShowNewFileDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            New File
          </Button>
        </div>
      </div>

      {/* Subfolders section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Folders</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {folder.folders && folder.folders.length > 0 ? (
            folder.folders.map((subfolder) => (
              <Link key={subfolder.id} href={`/projects/${subfolder.id}`}>
                <Card className="hover:bg-muted/50 transition-colors h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{subfolder.name}</CardTitle>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Folder className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">
                      {subfolder.folders?.length || 0} folder{subfolder.folders?.length !== 1 ? "s" : ""} •{" "}
                      {subfolder.files?.length || 0} file{subfolder.files?.length !== 1 ? "s" : ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  No folders found. Create a new folder to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Files section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Files</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {folder.files && folder.files.length > 0 ? (
            folder.files.map((file) => (
              <Link key={file.id} href={`/projects/${folderId}/files/${file.id}`}>
                <Card className="hover:bg-muted/50 transition-colors h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <File className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Click to view visualizations</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <File className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">No files found. Create a new file to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <NewFolderDialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog} defaultParentId={folderId} />
      <NewFileDialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog} defaultFolderId={folderId} />
    </div>
  )
}
