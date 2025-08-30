import { Ghost } from "lucide-react"

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Ghost className="w-12 h-12 text-gray-400" />
    <p className="mt-3 text-gray-600 font-medium">No dashboard data available.</p>
  </div>
)
