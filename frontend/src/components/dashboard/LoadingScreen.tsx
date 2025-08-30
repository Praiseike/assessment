import { Loader2 } from "lucide-react"

export const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-gray-700 font-medium">Loading your dashboard...</p>
    </div>
  </div>
)
