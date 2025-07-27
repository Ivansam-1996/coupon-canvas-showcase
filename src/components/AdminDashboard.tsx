import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Eye
} from "lucide-react";

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
    { id: "creator", label: "Coupon Creator", icon: Settings, badges: ["MVP"] },
    { id: "scheduler", label: "Smart Scheduler", icon: Calendar, badges: ["NEW"] },
    { id: "delivery", label: "Multi-Channel", icon: Zap, badges: ["USP"] },
    { id: "gamification", label: "Gamification", icon: Gamepad2, badges: ["NEW", "USP"] },
    { id: "ai-engine", label: "AI Engine", icon: Brain, badges: ["MVP", "USP"] },
    { id: "analytics", label: "Analytics", icon: BarChart3, badges: ["MVP"] },
    { id: "audit", label: "Audit Logs", icon: FileText, badges: [] },
    { id: "fraud", label: "Fraud Settings", icon: Shield, badges: ["NEW"] },
    { id: "localization", label: "Localization", icon: Globe, badges: ["USP"] },
    { id: "preview", label: "Live Preview", icon: Eye, badges: ["MVP", "DEMO"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Coupon Management System
          </h1>
          <p className="text-muted-foreground text-lg">
            Create, manage, and optimize your coupon campaigns with powerful AI-driven insights
          </p>
        </div>

        <Tabs defaultValue="creator" className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 mb-8 bg-card shadow-elegant p-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:block">{tab.label}</span>
                {tab.badges.length > 0 && (
                  <div className="absolute -top-1 -right-1 flex gap-1">
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
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content Area - 2/3 width */}
            <div className="xl:col-span-2">
              <TabsContent value="creator" className="animate-fade-in">
                <CouponCreator couponData={couponData} setCouponData={setCouponData} />
              </TabsContent>

              <TabsContent value="scheduler" className="animate-fade-in">
                <SmartScheduler />
              </TabsContent>

              <TabsContent value="delivery" className="animate-fade-in">
                <MultiChannelDelivery couponData={couponData} setCouponData={setCouponData} />
              </TabsContent>

              <TabsContent value="gamification" className="animate-fade-in">
                <GamificationConfigurator />
              </TabsContent>

              <TabsContent value="ai-engine" className="animate-fade-in">
                <AICouponEngine />
              </TabsContent>

              <TabsContent value="analytics" className="animate-fade-in">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="audit" className="animate-fade-in">
                <AuditLogs />
              </TabsContent>

              <TabsContent value="fraud" className="animate-fade-in">
                <FraudSettings />
              </TabsContent>

              <TabsContent value="localization" className="animate-fade-in">
                <LocalizationPanel couponData={couponData} setCouponData={setCouponData} />
              </TabsContent>

              <TabsContent value="preview" className="animate-fade-in xl:hidden">
                <CouponPreviewPanel couponData={couponData} />
              </TabsContent>
            </div>

            {/* Live Preview Panel - 1/3 width, always visible on large screens */}
            <div className="hidden xl:block">
              <div className="sticky top-6">
                <CouponPreviewPanel couponData={couponData} />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}