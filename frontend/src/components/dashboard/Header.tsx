import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface HeaderProps {
  simulatePurchase: () => Promise<void>;
  simulating: boolean;
}

export const Header = ({ simulatePurchase, simulating }: HeaderProps) => (
  <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loyalty Dashboard</h1>
        <p className="text-gray-600">Track your achievements and unlock exclusive rewards</p>
      </div>
      <Button
        onClick={simulatePurchase}
        disabled={simulating}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
      >
        {simulating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Simulate Purchase
          </>
        )}
      </Button>
    </div>
  </div>
);
