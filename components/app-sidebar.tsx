"use client"

import * as React from "react"
import {
  ChevronDown,
  File,
  FileText,
  FolderPlus,
  Folders,
  Home,
  LineChart,
  Plus,
  Settings,
  Star,
  Upload,
  Folder,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

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

// Create a context to share folder state across components
export const FoldersContext = React.createContext({
  folders: initialFolders,
  addProject: (name) => {},
  addFolder: (name, parentId) => {},
  addFile: (name, folderId) => {},
  getFolderById: (id) => null,
})

// Recursive component to render folders and their children
const FolderItem = ({ folder, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = folder.folders?.length > 0 || folder.files?.length > 0
  const pathname = usePathname()
  const isActive = pathname === `/projects/${folder.id}`

  return (
    <div className="w-full">
      <div className="flex w-full">
        <Link href={`/projects/${folder.id}`} className="flex-grow" onClick={(e) => e.stopPropagation()}>
          <SidebarMenuButton className="w-full justify-between" isActive={isActive}>
            <span>{folder.name}</span>
          </SidebarMenuButton>
        </Link>
        {hasChildren && (
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ml-1" onClick={() => setIsOpen(!isOpen)}>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        )}
      </div>

      {hasChildren && isOpen && (
        <SidebarMenuSub>
          {folder.folders?.map((subfolder) => (
            <SidebarMenuSubItem key={subfolder.id}>
              <div className="w-full">
                <Link href={`/projects/${subfolder.id}`} className="block w-full">
                  <SidebarMenuSubButton asChild isActive={pathname === `/projects/${subfolder.id}`}>
                    <div className="flex items-center">
                      <Folder className="h-4 w-4 mr-2" />
                      {subfolder.name}
                    </div>
                  </SidebarMenuSubButton>
                </Link>
              </div>
            </SidebarMenuSubItem>
          ))}
          {folder.files?.map((file) => (
            <SidebarMenuSubItem key={file.id}>
              <SidebarMenuSubButton asChild isActive={pathname === `/projects/${folder.id}/files/${file.id}`}>
                <Link href={`/projects/${folder.id}/files/${file.id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  {file.name}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </div>
  )
}

// New Folder Dialog Component
export const NewFolderDialog = ({ open, onOpenChange, defaultParentId = "root" }) => {
  const { folders, addFolder } = React.useContext(FoldersContext)
  const [folderName, setFolderName] = React.useState("")
  const [parentFolder, setParentFolder] = React.useState(defaultParentId)
  const { toast } = useToast()

  React.useEffect(() => {
    setParentFolder(defaultParentId)
  }, [defaultParentId, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (folderName.trim()) {
      addFolder(folderName, parentFolder)
      toast({
        title: "Folder created",
        description: `Folder "${folderName}" has been created successfully.`,
      })
      setFolderName("")
      onOpenChange(false)
    }
  }

  // Flatten folder structure for select options
  const getFolderOptions = (folders, prefix = "") => {
    let options = folders.map((folder) => ({
      id: folder.id,
      name: prefix ? `${prefix} > ${folder.name}` : folder.name,
    }))

    folders.forEach((folder) => {
      if (folder.folders?.length) {
        const newPrefix = prefix ? `${prefix} > ${folder.name}` : folder.name
        options = [...options, ...getFolderOptions(folder.folders, newPrefix)]
      }
    })

    return options
  }

  const folderOptions = [{ id: "root", name: "Root" }, ...getFolderOptions(folders)]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="My New Folder"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentFolder">Parent Folder</Label>
            <Select value={parentFolder} onValueChange={setParentFolder}>
              <SelectTrigger id="parentFolder">
                <SelectValue placeholder="Select parent folder" />
              </SelectTrigger>
              <SelectContent>
                {folderOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// New File Dialog Component
export const NewFileDialog = ({ open, onOpenChange, defaultFolderId = "" }) => {
  const { folders, addFile } = React.useContext(FoldersContext)
  const [fileName, setFileName] = React.useState("")
  const [parentFolder, setParentFolder] = React.useState(defaultFolderId)
  const { toast } = useToast()

  React.useEffect(() => {
    if (defaultFolderId) {
      setParentFolder(defaultFolderId)
    }
  }, [defaultFolderId, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (fileName.trim() && parentFolder) {
      addFile(fileName, parentFolder)
      toast({
        title: "File created",
        description: `File "${fileName}" has been created successfully.`,
      })
      setFileName("")
      onOpenChange(false)
    }
  }

  // Flatten folder structure for select options
  const getFolderOptions = (folders, prefix = "") => {
    let options = folders.map((folder) => ({
      id: folder.id,
      name: prefix ? `${prefix} > ${folder.name}` : folder.name,
    }))

    folders.forEach((folder) => {
      if (folder.folders?.length) {
        const newPrefix = prefix ? `${prefix} > ${folder.name}` : folder.name
        options = [...options, ...getFolderOptions(folder.folders, newPrefix)]
      }
    })

    return options
  }

  const folderOptions = getFolderOptions(folders)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="My New File"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentFolder">Parent Folder</Label>
            <Select value={parentFolder} onValueChange={setParentFolder}>
              <SelectTrigger id="parentFolder">
                <SelectValue placeholder="Select parent folder" />
              </SelectTrigger>
              <SelectContent>
                {folderOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Create File</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// New Project Dialog Component
export const NewProjectDialog = ({ open, onOpenChange }) => {
  const { addProject } = React.useContext(FoldersContext)
  const [projectName, setProjectName] = React.useState("")
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (projectName.trim()) {
      addProject(projectName)
      toast({
        title: "Project created",
        description: `Project "${projectName}" has been created successfully.`,
      })
      setProjectName("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My New Project"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AppSidebar() {
  const [showNewProjectDialog, setShowNewProjectDialog] = React.useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = React.useState(false)
  const [showNewFileDialog, setShowNewFileDialog] = React.useState(false)
  const { folders } = React.useContext(FoldersContext)
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <LineChart className="h-6 w-6" />
                <span className="font-semibold">Visualizer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/favorites"}>
                <Link href="/favorites">
                  <Star className="h-4 w-4" />
                  <span>Favorites</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/all-folders"}>
                <Link href="/all-folders">
                  <Folders className="h-4 w-4" />
                  <span>All Folders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/all-files"}>
                <Link href="/all-files">
                  <File className="h-4 w-4" />
                  <span>All Files</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-2">
            <SidebarGroupLabel className="py-0">Projects</SidebarGroupLabel>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowNewFolderDialog(true)}>
                <FolderPlus className="h-4 w-4" />
                <span className="sr-only">New Folder</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowNewFileDialog(true)}>
                <Upload className="h-4 w-4" />
                <span className="sr-only">New File</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowNewProjectDialog(true)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">New Project</span>
              </Button>
            </div>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <FolderItem folder={folder} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserNav />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full">
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
      <NewProjectDialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog} />
      <NewFolderDialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog} />
      <NewFileDialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog} />
    </Sidebar>
  )
}
