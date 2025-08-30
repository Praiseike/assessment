import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { getBadgeIcon, getBadgeColor } from "@/lib/dashboardUtils";

export const CurrentBadge = ({ badge }: { badge: string }) => (
  <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Crown className="w-6 h-6 text-yellow-500" />
        Your Current Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${getBadgeColor(badge)} flex items-center justify-center shadow-lg`}>
          {getBadgeIcon(badge)}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{badge}</h3>
          <p className="text-gray-600 mt-1">Current Badge</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
