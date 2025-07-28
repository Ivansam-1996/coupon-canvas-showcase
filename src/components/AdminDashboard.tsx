import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Calendar,
  Zap,
  Gamepad2,
  Brain,
  BarChart3,
  Shield,
  Globe,
  FileText,
  Eye,
  UserCircle
} from "lucide-react";

import { CouponCreator } from "./admin/CouponCreator";
import { SmartScheduler } from "./admin/SmartScheduler";
import { MultiChannelDelivery } from "./admin/MultiChannelDelivery";
import { GamificationConfigurator } from "./admin/GamificationConfigurator";
import { AICouponEngine } from "./admin/AICouponEngine";
import { AnalyticsDashboard } from "./admin/AnalyticsDashboard";
import { AuditLogs } from "./admin/AuditLogs";
import { FraudSettings } from "./admin/FraudSettings";
import { LocalizationPanel } from "./admin/LocalizationPanel";
import { CouponPreviewPanel } from "./admin/CouponPreviewPanel";

interface CouponData {
  type: string;
  value: string;
  title: string;
  description: string;
  expiryDate: string;
  minPurchase: string;
  usageLimit: string;
  perUserLimit: string;
  segments: string[];
  channels: string[];
  currency: string;
  locale: string;
  bannerImage?: string;
  logo?: string;
  termsConditions: string;
}

export function AdminDashboard() {
  const [couponData, setCouponData] = useState<CouponData>({
    type: "percentage",
    value: "20",
    title: "SAVE20",
    description: "Get 20% off your purchase",
    expiryDate: "2024-12-31",
    minPurchase: "50",
    usageLimit: "1000",
    perUserLimit: "1",
    segments: ["new-customers"],
    channels: ["web", "email"],
    currency: "USD",
    locale: "en-US",
    termsConditions: "Valid for first-time customers only. Cannot be combined with other offers."
  });

  const tabs = [
    { id: "creator", label: "Coupon Creator", icon: Settings, },
    // { id: "scheduler", label: "Smart Scheduler", icon: Calendar,},
    { id: "delivery", label: "Multi-Channel", icon: Zap,},
    { id: "gamification", label: "Gamification", icon: Gamepad2, },
    { id: "ai-engine", label: "AI Engine", icon: Brain, },
    { id: "analytics", label: "Analytics", icon: BarChart3},
    { id: "audit", label: "Audit Logs", icon: FileText,},   
      { id: "fraud", label: "Fraud Settings", icon: Shield, },
    // { id: "localization", label: "Localization", icon: Globe, :  },
    // { id: "preview", label: "Live Preview", icon: Eye, :  "DEMO"] }
  ];

  return (
    <Tabs defaultValue="creator" className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#000000] border border-gray-300 p-4 shadow-md flex flex-col">
        {/* Top section: search + icons */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-sm px-3 py-1.5 border border-muted rounded-md"
            />
            <UserCircle className="w-5 h-5 text-muted-foreground" />
            <Settings className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Navigation */}
        <TabsList className="flex flex-col gap-2 overflow-y-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <div className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </div>
              {/* {tab.badges.length > 0 && (
                <div className="flex gap-1">
                  {tab.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className={`text-xs px-1 py-0 h-4 ${
                        badge === "MVP" ? "bg-success text-success-foreground" :
                        badge === "USP" ? "bg-warning text-warning-foreground" :
                        badge === "NEW" ? "bg-info text-info-foreground" :
                        "bg-primary text-primary-foreground"
                      }`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )} */}
            </TabsTrigger>
          ))}
        </TabsList>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Coupon Management System</h1>
          <p className="text-muted-foreground text-lg">
            Create, manage, and optimize your coupon campaigns with powerful AI-driven insights
          </p>
        </div>

        {/* Tab contents */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            <TabsContent value="creator"><CouponCreator couponData={couponData} setCouponData={setCouponData} /></TabsContent>
            <TabsContent value="scheduler"><SmartScheduler /></TabsContent>
            <TabsContent value="delivery"><MultiChannelDelivery couponData={couponData} setCouponData={setCouponData} /></TabsContent>
            <TabsContent value="gamification"><GamificationConfigurator /></TabsContent>
            <TabsContent value="ai-engine"><AICouponEngine /></TabsContent>
            <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>
            <TabsContent value="audit"><AuditLogs /></TabsContent>
            <TabsContent value="fraud"><FraudSettings /></TabsContent>
            <TabsContent value="localization"><LocalizationPanel couponData={couponData} setCouponData={setCouponData} /></TabsContent>
            <TabsContent value="preview" className="xl:hidden"><CouponPreviewPanel couponData={couponData} /></TabsContent>
          </div>

          {/* Live Preview Panel */}
          <div className="hidden xl:block">
            <div className="sticky top-6">
              <CouponPreviewPanel couponData={couponData} />
            </div>
          </div>
        </div>
      </main>
    </Tabs>
  );
}
