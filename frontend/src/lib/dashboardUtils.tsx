import { ShoppingBag, Target, Coins, Gift, Award, Star, Trophy, Crown, Sparkles } from "lucide-react";

export const getBadgeIcon = (badgeName: string) => {
  const badgeIcons: Record<string, React.ReactNode> = {
    "Newcomer": <Star className="w-6 h-6" />,
    "Silver Shopper": <Trophy className="w-6 h-6" />,
    "Gold Shopper": <Award className="w-6 h-6" />,
    "Platinum Shopper": <Crown className="w-6 h-6" />,
    "Diamond Shopper": <Sparkles className="w-6 h-6" />,
    "None": <Target className="w-6 h-6 opacity-50" />,
  };
  return badgeIcons[badgeName] || <Trophy className="w-6 h-6" />;
};

export const getBadgeColor = (badgeName: string) => {
  const badgeColors: Record<string, string> = {
    "Newcomer": "from-green-400 to-green-600 text-white",
    "Silver Shopper": "from-gray-400 to-gray-600 text-white",
    "Gold Shopper": "from-yellow-400 to-yellow-600 text-white",
    "Platinum Shopper": "from-purple-400 to-purple-600 text-white",
    "Diamond Shopper": "from-blue-400 to-blue-600 text-white",
    "None": "from-gray-200 to-gray-300 text-gray-600",
  };
  return badgeColors[badgeName] || "from-gray-400 to-gray-600 text-white";
};

export const getAchievementIcon = (_achievement: string, index: number) => {

  // it's sha based on index and loops around
  const icons = [
    <ShoppingBag className="w-5 h-5" />,
    <Target className="w-5 h-5" />,
    <Coins className="w-5 h-5" />,
    <Gift className="w-5 h-5" />,
    <Award className="w-5 h-5" />,
    <Star className="w-5 h-5" />,
    <Trophy className="w-5 h-5" />,
    <Crown className="w-5 h-5" />,
  ];
  return icons[index % icons.length];
};
