import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Target } from "lucide-react"
import { getAchievementIcon } from "@/lib/dashboardUtils"

export const AchievementNextList = ({ achievements }: { achievements: string[] }) => (
  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Target className="w-6 h-6 text-green-500" />
        Next Achievements
      </CardTitle>
    </CardHeader>
    <CardContent>
      {achievements.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <li
              key={i}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border"
            >
              <div className="text-green-600">{getAchievementIcon(a, i)}</div>
              <span className="font-medium text-gray-800">{a}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No upcoming achievements.</p>
      )}
    </CardContent>
  </Card>
)
