import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Repeat, Play } from "lucide-react";
import { useState } from "react";

export function SmartScheduler() {
  const [isRecurring, setIsRecurring] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const scheduleOptions = [
    { id: "daily", label: "Daily", desc: "Every day at specified time" },
    { id: "weekly", label: "Weekly", desc: "Every week on selected days" },
    { id: "monthly", label: "Monthly", desc: "Monthly on specific date" },
    { id: "custom", label: "Custom", desc: "Custom recurrence pattern" }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-info to-info/80 text-info-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Smart Scheduler
              <Badge variant="secondary" className="bg-warning text-warning-foreground">NEW</Badge>
            </CardTitle>
            <CardDescription className="text-info-foreground/80">
              Automate coupon campaigns with intelligent scheduling
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Campaign Status */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h3 className="font-semibold">Campaign Status</h3>
            <p className="text-sm text-muted-foreground">
              {isActive ? "Campaign is currently active" : "Campaign is scheduled"}
            </p>
          </div>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>

        {/* Schedule Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Start Date & Time</Label>
              <div className="mt-2 p-3 border rounded-lg flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>March 15, 2024 at 9:00 AM</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">End Date & Time</Label>
              <div className="mt-2 p-3 border rounded-lg flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>March 31, 2024 at 11:59 PM</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Recurring Campaign</Label>
              <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
            </div>

            {isRecurring && (
              <div>
                <Label className="text-sm font-medium mb-2 block">Recurrence Pattern</Label>
                <div className="grid grid-cols-2 gap-2">
                  {scheduleOptions.map((option) => (
                    <div
                      key={option.id}
                      className="p-3 border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Repeat className="h-4 w-4" />
                        <span className="font-medium text-sm">{option.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{option.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Period Summary */}
        <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-success" />
            <h3 className="font-semibold text-success">Next Active Period</h3>
          </div>
          <p className="text-sm">
            Campaign will be active from <strong>March 15, 2024 9:00 AM</strong> to{" "}
            <strong>March 31, 2024 11:59 PM</strong>
          </p>
          {isRecurring && (
            <p className="text-sm text-muted-foreground mt-1">
              Then repeats daily at 9:00 AM
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1" variant="gradient">
            <Play className="mr-2 h-4 w-4" />
            {isActive ? "Update Schedule" : "Activate Campaign"}
          </Button>
          <Button variant="outline">
            Preview Timeline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}