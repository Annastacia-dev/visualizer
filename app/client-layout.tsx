"use client"

import type React from "react"

import { AppSidebar, FoldersContext } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider, ProtectedRoute } from "@/contexts/auth-context"
import "./globals.css"
import { useState } from "react"
import { usePathname } from "next/navigation"

// Initial sample data structure for folders and files
const initialFolders = [
  {
    id: "1",
    name: "Shopify",
    folders: [
      {
        id: "1-1",
        name: "Orders",
        folders: [
          {
            id: "1-1-1",
            name: "2025",
            folders: [
              { id: "1-1-1-1", name: "January", files: [{ id: "f1", name: "Weekly Sales" }] },
              { id: "1-1-1-2", name: "February", files: [{ id: "f2", name: "Monthly Report" }] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Analytics",
    folders: [
      { id: "2-1", name: "Website Traffic", files: [{ id: "f3", name: "Q1 Analysis" }] },
      { id: "2-2", name: "Conversions", files: [{ id: "f4", name: "Funnel Visualization" }] },
    ],
  },
  {
    id: "3",
    name: "Marketing",
    folders: [{ id: "3-1", name: "Campaigns", files: [{ id: "f5", name: "Email Performance" }] }],
  },
]

function AppContent({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState(initialFolders)
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const isLandingPage = pathname === "/landing"

  // Helper function to find a folder by ID
  const findFolderById = (folders, id) => {
    for (const folder of folders) {
      if (folder.id === id) return folder

      if (folder.folders?.length) {
        const found = findFolderById(folder.folders, id)
        if (found) return found
      }
    }
    return null
  }

  // Function to get a folder by ID
  const getFolderById = (id) => {
    return findFolderById(folders, id)
  }

  // Function to add a new project (top-level folder)
  const addProject = (name) => {
    const newProject = {
      id: `project-${Date.now()}`,
      name,
      folders: [],
    }
    setFolders((prevFolders) => [...prevFolders, newProject])
  }

  // Function to add a new folder to a parent folder
  const addFolder = (name, parentId) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      folders: [],
      files: [],
    }

    if (parentId === "root") {
      // Add to root level
      setFolders((prevFolders) => [...prevFolders, newFolder])
    } else {
      // Add to specific parent folder
      setFolders((prevFolders) => {
        const updatedFolders = [...prevFolders]

        // Helper function to recursively update folders
        const updateFolders = (folders) => {
          return folders.map((folder) => {
            if (folder.id === parentId) {
              return {
                ...folder,
                folders: [...(folder.folders || []), newFolder],
              }
            }

            if (folder.folders?.length) {
              return {
                ...folder,
                folders: updateFolders(folder.folders),
              }
            }

            return folder
          })
        }

        return updateFolders(updatedFolders)
      })
    }
  }

  // Function to add a new file to a folder
  const addFile = (name, folderId) => {
    const newFile = {
      id: `file-${Date.now()}`,
      name,
    }

    setFolders((prevFolders) => {
      const updatedFolders = [...prevFolders]

      // Helper function to recursively update folders
      const updateFolders = (folders) => {
        return folders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              files: [...(folder.files || []), newFile],
            }
          }

          if (folder.folders?.length) {
            return {
              ...folder,
              folders: updateFolders(folder.folders),
            }
          }

          return folder
        })
      }

      return updateFolders(updatedFolders)
    })
  }

  const contextValue = {
    folders,
    addProject,
    addFolder,
    addFile,
    getFolderById,
  }

  if (isAuthPage || isLandingPage) {
    return <>{children}</>
  }

  return (
    <FoldersContext.Provider value={contextValue}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </FoldersContext.Provider>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ProtectedRoute>
              <AppContent>{children}</AppContent>
            </ProtectedRoute>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
