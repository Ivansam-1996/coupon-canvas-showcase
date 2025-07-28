import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, QrCode, Smartphone, Monitor, Image, Download } from "lucide-react";
import { useState } from "react";

interface CouponData {
  type: string;
  value: string;
  title: string;
  description: string;
  currency: string;
  termsConditions: string;
}

interface CouponPreviewPanelProps {
  couponData: CouponData;
}

export function CouponPreviewPanel({ couponData }: CouponPreviewPanelProps) {
  const [showQR, setShowQR] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [deviceView, setDeviceView] = useState<"mobile" | "desktop">("desktop");

  const getDiscountText = () => {
    const symbol = couponData.currency === "USD" ? "$" : "€";
    switch (couponData.type) {
      case "fixed":
        return `${symbol}${couponData.value} OFF`;
      case "percentage":
        return `${couponData.value}% OFF`;
      case "bogo":
        return "BUY ONE GET ONE";
      case "shipping":
        return "FREE SHIPPING";
      default:
        return `${couponData.value}% OFF`;
    }
  };

  // Vertical Layout Component
  const VerticalPreview = () => (
    <div className={`bg-white border-2 border-dashed border-primary/30 rounded-lg overflow-hidden ${
      deviceView === "mobile" ? "max-w-sm mx-auto" : "w-full"
    }`}>
      {showBanner && (
        <div className="h-24 bg-gradient-coupon flex items-center justify-center">
          <Image className="h-8 w-8 text-white/70" />
        </div>
      )}
      <div className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">
          {getDiscountText()}
        </div>
        <div className="text-lg font-semibold mb-1">{couponData.title}</div>
        <div className="text-muted-foreground mb-4">{couponData.description}</div>
        
        {showQR && (
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-900 rounded flex items-center justify-center">
            <QrCode className="h-16 w-16 text-white" />
          </div>
        )}
        
        <Button variant="coupon" className="w-full mb-3">
          Apply Coupon
        </Button>
        
        <div className="text-xs text-muted-foreground border-t pt-2">
          {couponData.termsConditions}
        </div>
      </div>
    </div>
  );

  // Horizontal Layout Component
  const HorizontalPreview = () => (
    <div className={`bg-white border-2 border-dashed border-primary/30 rounded-lg overflow-hidden ${
      deviceView === "mobile" ? "max-w-sm mx-auto" : "w-full"
    }`}>
      <div className="flex items-center p-4">
        <div className="flex-1">
          <div className="text-2xl font-bold text-primary mb-1">
            {getDiscountText()}
          </div>
          <div className="font-semibold">{couponData.title}</div>
          <div className="text-sm text-muted-foreground">{couponData.description}</div>
          <div className="text-xs text-muted-foreground mt-1">Expires: March 31, 2024</div>
        </div>
        
        {showQR && (
          <div className="w-16 h-16 bg-gray-900 rounded flex items-center justify-center ml-4">
            <QrCode className="h-12 w-12 text-white" />
          </div>
        )}
      </div>
    </div>
  );

  // Minimal Layout Component
  const MinimalPreview = () => (
    <div className={`bg-white border-2 border-dashed border-primary/30 rounded-lg overflow-hidden ${
      deviceView === "mobile" ? "max-w-sm mx-auto" : "w-full"
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <Badge variant="secondary" className="bg-success text-success-foreground">
            ACTIVE
          </Badge>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {getDiscountText()}
          </div>
          <div className="text-sm text-muted-foreground">{couponData.description}</div>
        </div>
        
        <Button variant="outline" className="w-full text-sm">
          Reveal Code
        </Button>
        
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Valid until March 31, 2024
        </div>
      </div>
    </div>
  );

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Coupon Preview
          {/* <Badge variant="secondary" className="bg-success text-success-foreground">MVP</Badge>
          <Badge variant="secondary" className="bg-warning text-warning-foreground">DEMO</Badge> */}
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Real-time preview of your coupon design
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Preview Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={showQR} onCheckedChange={setShowQR} />
                <span className="text-sm">Show QR Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showBanner} onCheckedChange={setShowBanner} />
                <span className="text-sm">Show Banner</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={deviceView === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Layout Tabs */}
        <Tabs defaultValue="vertical" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vertical">Vertical (Banner+QR)</TabsTrigger>
            <TabsTrigger value="horizontal">Horizontal Compact</TabsTrigger>
            <TabsTrigger value="minimal">Minimal Card</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vertical" className="mt-6">
            <VerticalPreview />
          </TabsContent>
          
          <TabsContent value="horizontal" className="mt-6">
            <HorizontalPreview />
          </TabsContent>
          
          <TabsContent value="minimal" className="mt-6">
            <MinimalPreview />
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Export PNG
          </Button>
          <Button variant="outline" className="flex-1">
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR
          </Button>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Badge variant="outline" className="text-xs">
            <Eye className="mr-1 h-3 w-3" />
            Real-time Preview
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Smartphone className="mr-1 h-3 w-3" />
            Mobile Responsive
          </Badge>
          <Badge variant="outline" className="text-xs">
            <QrCode className="mr-1 h-3 w-3" />
            QR Code Ready
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}