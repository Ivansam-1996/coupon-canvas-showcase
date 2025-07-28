import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Globe, Mail, Smartphone, QrCode, MessageSquare,MessageCircleMore } from "lucide-react";

interface CouponData {
  channels: string[];
}

interface MultiChannelDeliveryProps {
  couponData: CouponData;
  setCouponData: (data: any) => void;
}

export function MultiChannelDelivery({ couponData, setCouponData }: MultiChannelDeliveryProps) {
  const channels = [
    { id: "web", label: "Whatsapp", icon: MessageCircleMore, desc: "Send via whatsapp", color: "text-green-500" },
    { id: "email", label: "Email", icon: Mail, desc: "Send via email ", color: "text-blue-500" },
    { id: "sms", label: "SMS", icon: Smartphone, desc: "Text message delivery", color: "text-purple-500" },
    { id: "qr", label: "QR Code", icon: QrCode, desc: "Generate QR codes for offline use", color: "text-orange-500" },
    // { id: "social", label: "Social Media", icon: MessageSquare, desc: "Share on social platforms", color: "text-pink-500" }
  ];

  const toggleChannel = (channelId: string) => {
    const newChannels = couponData.channels.includes(channelId)
      ? couponData.channels.filter(c => c !== channelId)
      : [...couponData.channels, channelId];
    setCouponData({ ...couponData, channels: newChannels });
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-blue to-coupon-purple text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Multi-Channel Delivery
          <Badge variant="secondary" className="bg-warning text-warning-foreground">USP</Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          Configure delivery channels for maximum reach
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((channel) => {
            const isActive = couponData.channels.includes(channel.id);
            const IconComponent = channel.icon;
            
            return (
              <div
                key={channel.id}
                className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => toggleChannel(channel.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-6 w-6 ${channel.color}`} />
                    <h3 className="font-semibold">{channel.label}</h3>
                  </div>
                  <Switch checked={isActive} />
                </div>
                <p className="text-sm text-muted-foreground">{channel.desc}</p>
                {isActive && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-xs text-success font-medium">Active</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}