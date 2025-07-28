import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Upload, Save, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

interface CouponCreatorProps {
  couponData: CouponData;
  setCouponData: (data: CouponData) => void;
}

export function CouponCreator({ couponData, setCouponData }: CouponCreatorProps) {
  const [date, setDate] = useState<Date>();

  const updateField = (field: keyof CouponData, value: any) => {
    setCouponData({ ...couponData, [field]: value });
  };

  const couponTypes = [
    { value: "fixed", label: "Fixed Amount" },
    { value: "percentage", label: "Percentage" },
    { value: "bogo", label: "Buy One Get One" },
    { value: "shipping", label: "Free Shipping" }
  ];

  const segments = [
    { value: "all", label: "All Customers" },
    { value: "new-customers", label: "New Customers" },
    { value: "vip", label: "VIP Members" },
    { value: "inactive", label: "Inactive Users" }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Coupon Creator
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Design and configure your coupon campaigns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="type" className="text-sm font-medium">Coupon Type</Label>
              <Select value={couponData.type} onValueChange={(value) => updateField("type", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {couponTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value" className="text-sm font-medium">Value</Label>
              <Input
                id="value"
                value={couponData.value}
                onChange={(e) => updateField("value", e.target.value)}
                placeholder="20"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="title" className="text-sm font-medium">Coupon Code</Label>
              <Input
                id="title"
                value={couponData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="SAVE20"
                className="mt-1 font-mono"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input
                id="description"
                value={couponData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Get 20% off your purchase"
                className="mt-1"
              />
            </div>
          </div>

          {/* Advanced Configuration */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="minPurchase" className="text-sm font-medium">Minimum Purchase</Label>
              <Input
                id="minPurchase"
                value={couponData.minPurchase}
                onChange={(e) => updateField("minPurchase", e.target.value)}
                placeholder="50"
                type="number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="usageLimit" className="text-sm font-medium">Total Usage Limit</Label>
              <Input
                id="usageLimit"
                value={couponData.usageLimit}
                onChange={(e) => updateField("usageLimit", e.target.value)}
                placeholder="1000"
                type="number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="perUserLimit" className="text-sm font-medium">Per User Limit</Label>
              <Input
                id="perUserLimit"
                value={couponData.perUserLimit}
                onChange={(e) => updateField("perUserLimit", e.target.value)}
                placeholder="1"
                type="number"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* User Segments */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Target Segments</Label>
          <div className="flex flex-wrap gap-2">
            {segments.map((segment) => (
              <Badge
                key={segment.value}
                variant={couponData.segments.includes(segment.value) ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() => {
                  const newSegments = couponData.segments.includes(segment.value)
                    ? couponData.segments.filter(s => s !== segment.value)
                    : [...couponData.segments, segment.value];
                  updateField("segments", newSegments);
                }}
              >
                {segment.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Banner Image</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload banner</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Logo</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload logo</p>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <Label htmlFor="terms" className="text-sm font-medium">Terms & Conditions</Label>
          <Textarea
            id="terms"
            value={couponData.termsConditions}
            onChange={(e) => updateField("termsConditions", e.target.value)}
            placeholder="Enter terms and conditions..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1" variant="gradient">
            <Save className="mr-2 h-4 w-4" />
            Save Coupon
          </Button>
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}