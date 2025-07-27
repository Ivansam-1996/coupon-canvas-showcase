import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Calendar } from "lucide-react";

export function AnalyticsDashboard() {
  const metrics = [
    { label: "Total Redemptions", value: "12,847", change: "+18%", trend: "up", icon: TrendingUp },
    { label: "Active Coupons", value: "23", change: "+3", trend: "up", icon: Eye },
    { label: "Revenue Impact", value: "$45,320", change: "+24%", trend: "up", icon: DollarSign },
    { label: "Unique Users", value: "8,934", change: "+12%", trend: "up", icon: Users }
  ];

  const topPerformers = [
    { code: "SAVE20", redemptions: 3420, revenue: "$18,240", channel: "Email" },
    { code: "WELCOME10", redemptions: 2890, revenue: "$12,150", channel: "Web" },
    { code: "FLASH50", redemptions: 1670, revenue: "$8,930", channel: "SMS" }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-blue to-info text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics Dashboard
          <Badge variant="secondary" className="bg-success text-success-foreground">MVP</Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          Real-time insights and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-muted">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart Mockup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Redemption Trends (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg flex items-end justify-center p-4">
              <div className="flex items-end gap-2 h-full w-full max-w-md">
                {Array.from({ length: 7 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-primary rounded-t flex-1 animate-scale-in"
                    style={{ 
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Coupons */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((coupon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{coupon.code}</div>
                      <div className="text-sm text-muted-foreground">via {coupon.channel}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{coupon.redemptions.toLocaleString()} uses</div>
                    <div className="text-sm text-success">{coupon.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-coupon-blue/30">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-coupon-blue">42%</div>
              <div className="text-sm text-muted-foreground">Email Channel</div>
            </CardContent>
          </Card>
          <Card className="border-coupon-green/30">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-coupon-green">31%</div>
              <div className="text-sm text-muted-foreground">Website</div>
            </CardContent>
          </Card>
          <Card className="border-coupon-purple/30">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-coupon-purple">27%</div>
              <div className="text-sm text-muted-foreground">SMS</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}