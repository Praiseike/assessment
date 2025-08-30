import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { getAchievementIcon } from "@/lib/dashboardUtils"

export const AchievementList = ({ achievements }: { achievements: string[] }) => (
  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Award className="w-6 h-6 text-blue-500" />
        Your Achievements
      </CardTitle>
    </CardHeader>
    <CardContent>
      {achievements.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <div className="text-purple-600">{getAchievementIcon(a, i)}</div>
              <span className="font-medium text-gray-800">{a}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No achievements unlocked yet.</p>
      )}
    </CardContent>
  </Card>
)
