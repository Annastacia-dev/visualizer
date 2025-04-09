"use client"

import { useContext } from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { FoldersContext } from "./app-sidebar"

interface BreadcrumbNavProps {
  folderId: string
  fileId?: string
}

export function BreadcrumbNav({ folderId, fileId }: BreadcrumbNavProps) {
  const { getFolderById, folders } = useContext(FoldersContext)

  // Build the breadcrumb path
  const buildPath = (
    id: string,
    path: Array<{ id: string; name: string }> = [],
  ): Array<{ id: string; name: string }> => {
    // Find the current folder
    const folder = getFolderById(id)
    if (!folder) return path

    // Add current folder to path
    path.unshift({ id: folder.id, name: folder.name })

    // Find parent folder by checking if this folder is in any other folder's children
    for (const parentCandidate of folders) {
      if (findParent(parentCandidate, id, path)) {
        break
      }
    }

    return path
  }

  // Helper function to find parent folder
  const findParent = (folder: any, childId: string, path: Array<{ id: string; name: string }>): boolean => {
    // Check if this folder contains the child directly
    if (folder.folders?.some((f: any) => f.id === childId)) {
      path.unshift({ id: folder.id, name: folder.name })
      return true
    }

    // Check nested folders
    if (folder.folders) {
      for (const subFolder of folder.folders) {
        if (findParent(subFolder, childId, path)) {
          path.unshift({ id: folder.id, name: folder.name })
          return true
        }
      }
    }

    return false
  }

  // Get the current folder and file
  const currentFolder = getFolderById(folderId)
  let currentFile

  if (fileId && currentFolder?.files) {
    currentFile = currentFolder.files.find((file) => file.id === fileId)
  }

  // Build the breadcrumb path
  const breadcrumbPath = buildPath(folderId)

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link href="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      <ChevronRight className="h-4 w-4" />

      {breadcrumbPath.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          <Link
            href={`/projects/${item.id}`}
            className={`hover:text-foreground ${index === breadcrumbPath.length - 1 && !fileId ? "font-medium text-foreground" : ""}`}
          >
            {item.name}
          </Link>
        </div>
      ))}

      {fileId && currentFile && (
        <>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-medium text-foreground">{currentFile.name}</span>
        </>
      )}
    </nav>
  )
}
