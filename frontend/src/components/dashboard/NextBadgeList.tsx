import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Props {
  nextBadge: string
  progress: number
  threshold: number
  points: number
}

export const NextBadgeProgress = ({ nextBadge, progress, threshold, points }: Props) => (
  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500" />
        Next Badge Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-3">
        <p className="text-gray-700">
          <span className="font-semibold">{points}</span> / {threshold} points for{" "}
          <span className="font-semibold text-purple-600">{nextBadge}</span>
        </p>
      </div>
      <Progress value={progress} className="h-3" />
    </CardContent>
  </Card>
)
