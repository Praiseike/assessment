import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface Props {
  nextBadge: string
  points: number
}

export const NextBadgeProgress = ({ nextBadge, points }: Props) => (
  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-purple-500" />
        Next Badge Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">{ points}</span> more to unlock{" "}
        <span className="font-bold text-purple-600">{nextBadge}</span>.
      </p>
      
    </CardContent>
  </Card>
)
