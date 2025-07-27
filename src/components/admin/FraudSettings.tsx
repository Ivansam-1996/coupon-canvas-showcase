import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, Clock, Users } from "lucide-react";
import { useState } from "react";

export function FraudSettings() {
  const [settings, setSettings] = useState({
    ipRestriction: true,
    sessionLimits: true,
    emailValidation: true,
    suspiciousActivity: true,
    rateLimiting: true,
    geoBlocking: false
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const protectionSettings = [
    {
      id: "ipRestriction",
      title: "IP Address Restriction",
      description: "Limit coupon usage per IP address",
      icon: Shield,
      risk: "High",
      enabled: settings.ipRestriction
    },
    {
      id: "sessionLimits",
      title: "Session-based Limits",
      description: "Prevent multiple redemptions in same session",
      icon: Clock,
      risk: "Medium",
      enabled: settings.sessionLimits
    },
    {
      id: "emailValidation",
      title: "Email Verification",
      description: "Require verified email for coupon redemption",
      icon: Users,
      risk: "Medium",
      enabled: settings.emailValidation
    },
    {
      id: "suspiciousActivity",
      title: "Suspicious Activity Detection",
      description: "AI-powered fraud detection and alerts",
      icon: AlertTriangle,
      risk: "High",
      enabled: settings.suspiciousActivity
    }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Fraud Protection Settings
          <Badge variant="secondary" className="bg-warning text-warning-foreground">NEW</Badge>
        </CardTitle>
        <CardDescription className="text-destructive-foreground/80">
          Configure security measures to prevent coupon abuse
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Protection Features */}
        <div className="space-y-4">
          {protectionSettings.map((setting) => (
            <div
              key={setting.id}
              className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                setting.enabled 
                  ? 'border-success bg-success/5' 
                  : 'border-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <setting.icon className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">{setting.title}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      setting.risk === 'High' ? 'border-destructive text-destructive' :
                      setting.risk === 'Medium' ? 'border-warning text-warning' :
                      'border-success text-success'
                    }`}
                  >
                    {setting.risk} Risk
                  </Badge>
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              </div>
              
              {setting.enabled && (
                <div className="mt-3 pt-3 border-t border-muted">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {setting.id === 'ipRestriction' && (
                      <>
                        <div>
                          <Label htmlFor="maxPerIp" className="text-sm">Max uses per IP</Label>
                          <Input id="maxPerIp" type="number" defaultValue="3" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="timeWindow" className="text-sm">Time window (hours)</Label>
                          <Input id="timeWindow" type="number" defaultValue="24" className="mt-1" />
                        </div>
                      </>
                    )}
                    
                    {setting.id === 'sessionLimits' && (
                      <>
                        <div>
                          <Label htmlFor="sessionLimit" className="text-sm">Max per session</Label>
                          <Input id="sessionLimit" type="number" defaultValue="1" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cooldown" className="text-sm">Cooldown (minutes)</Label>
                          <Input id="cooldown" type="number" defaultValue="30" className="mt-1" />
                        </div>
                      </>
                    )}
                    
                    {setting.id === 'emailValidation' && (
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Block disposable email domains</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Security Summary */}
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-success">Security Status</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {Object.values(settings).filter(Boolean).length}/6
                </div>
                <div className="text-sm text-muted-foreground">Active Protections</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Fraud Prevention</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Blocked Attempts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}