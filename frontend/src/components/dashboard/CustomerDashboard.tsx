"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { CurrentBadge } from "@/components/dashboard/CurrentBadge";
import { NextBadgeProgress } from "@/components/dashboard/NextBadgeProgress";
import { AchievementList } from "@/components/dashboard/AchievementList";
import { AchievementNextList } from "@/components/dashboard/AchievementNextList";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { customerService } from "@/services/customerService";

interface CustomerData {
  current_badge: string;
  unlocked_achievements: string[];
  next_badge: string;
  next_available_achievements: string[];
  remaining_to_unlock_next_badge: number;
}

const TEST_USER_ID = 1;

export const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchCustomerData = async () => {
    try {
      if (initialLoad) {
        setInitialLoad(false);
        setLoading(true);
      }
      setError(null);
      const data = await customerService.getDashboard(TEST_USER_ID);
      setCustomerData(data.data);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const simulatePurchase = async () => {
    try {
      setSimulating(true);
      setError(null);
      await customerService.simulatePurchase(TEST_USER_ID);
      await fetchCustomerData();
    } catch (err) {
      setError("Purchase simulation failed. Please try again.");
    } finally {
      setSimulating(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);


  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} retry={fetchCustomerData} />;
  if (!customerData) return <EmptyState />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header simulatePurchase={simulatePurchase} simulating={simulating} />

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CurrentBadge badge={customerData.current_badge} />

        <NextBadgeProgress
          nextBadge={customerData.next_badge}
          points={customerData.remaining_to_unlock_next_badge}
        />

        <AchievementList achievements={customerData.unlocked_achievements} />

        <AchievementNextList
          achievements={customerData.next_available_achievements}
        />
      </main>
    </div>
  );
};
