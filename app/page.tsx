import { FileUploader } from "@/components/file-uploader"
import { DashboardHeader } from "@/components/dashboard-header"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <DashboardHeader />
      <div className="w-full max-w-5xl mt-8">
        <FileUploader />
      </div>
    </main>
  )
}
