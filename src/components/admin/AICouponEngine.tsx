import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ShoppingCart,
  TrendingUp,
  Zap,
  Info,
  Package,
  Users,
  Gift,
  Truck,
} from "lucide-react";
import { useState } from "react";

// --- MOCK DATA ---
const cartContexts = [
  {
    id: "small-cart",
    label: "Small Cart (Impulse Buyer)",
    icon: <ShoppingCart className="h-4 w-4" />,
    items: [
      { name: "Coffee Mug", price: 12.99, category: "Home" },
      { name: "Desk Pen Holder", price: 8.99, category: "Office" },
    ],
    ai: {
      couponCode: "WELCOME10",
      discount: "10% OFF",
      rationale:
        "Lower % discount encourages conversion for low-value, single-item carts. AI detects a price-conscious impulse shopper segment in daily traffic.",
      expectedUplift: "+14%",
      confidence: 89,
      trend: "Home & Office ↑",
      optimal: "5–15%",
    },
    meta: {
      relevance: "+82%",
      gain: "+12%",
      roi: "1.6x",
    },
  },
  {
    id: "holiday",
    label: "Holiday Season Cart",
    icon: <Gift className="h-4 w-4" />,
    items: [
      { name: "Bluetooth Speaker", price: 39.99, category: "Electronics" },
      { name: "Holiday Scented Candle Set", price: 24.99, category: "Home" },
    ],
    ai: {
      couponCode: "XMASSHIP",
      discount: "Free Shipping",
      rationale:
        "Shoppers during holiday spikes are sensitive to shipping costs. AI recommends free shipping for high gift basket conversion and less margin impact.",
      expectedUplift: "+19%",
      confidence: 95,
      trend: "Gifts & Electronics ↑",
      optimal: "Free/Flat Shipping",
    },
    meta: {
      relevance: "+91%",
      gain: "+20%",
      roi: "2.1x",
    },
  },
  {
    id: "electronics",
    label: "High-Value Electronics Cart",
    icon: <Zap className="h-4 w-4" />,
    items: [
      { name: "Wireless Headphones", price: 129.99, category: "Electronics" },
      { name: "Portable SSD", price: 99.99, category: "Electronics" },
    ],
    ai: {
      couponCode: "ELEC15",
      discount: "15% OFF",
      rationale:
        "Large basket and premium electronics: AI recommends a higher % discount to tip high-investment, hesitant shoppers. Drives urgency for top-line growth.",
      expectedUplift: "+23%",
      confidence: 92,
      trend: "Electronics ↑",
      optimal: "10–20%",
    },
    meta: {
      relevance: "+94%",
      gain: "+31%",
      roi: "2.4x",
    },
  },
  {
    id: "bulk",
    label: "Bulk Buyer (Office Supplies)",
    icon: <Users className="h-4 w-4" />,
    items: [
      { name: "Pack of Notebooks (10x)", price: 29.99, category: "Office" },
      { name: "Box of Pens (100x)", price: 19.99, category: "Office" },
      { name: "Desk Organizer", price: 14.99, category: "Office" },
    ],
    ai: {
      couponCode: "BULK20",
      discount: "$20 OFF OVER $50",
      rationale:
        "Flat discounts motivate higher ticket sizes and reward big buyers. AI detects multiple quantity/redemption—flat $ value best for profit and volume.",
      expectedUplift: "+17%",
      confidence: 88,
      trend: "Office Supplies ↑",
      optimal: "$10–25",
    },
    meta: {
      relevance: "+79%",
      gain: "+15%",
      roi: "1.8x",
    },
  },
] as const;

// --- MAIN SIMULATOR COMPONENT ---

export function AICouponEngine() {
  const [selected, setSelected] = useState(2); // Default to electronics example
  const ctx = cartContexts[selected];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-green to-success text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Coupon Recommendation Simulator
        </CardTitle>
        <CardDescription className="text-white/80">
          Test coupon strategies for real customer carts & let AI coach you
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-6">

        {/* CART CONTEXT SELECTOR */}
        <div className="flex gap-3 pb-2 overflow-x-auto">
          {cartContexts.map((cc, i) => (
            <Button
              key={cc.id}
              variant={i === selected ? "gradient" : "outline"}
              className="flex gap-2 items-center min-w-[180px] py-2 px-3"
              onClick={() => setSelected(i)}
            >
              {cc.icon}
              {cc.label}
              {i === selected && (
                <Badge className="ml-1 bg-success text-success-foreground text-xs">Simulating</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* CART DETAILS */}
        <Card className="bg-muted/30 mb-1">
          <CardHeader className="flex-row gap-3 pb-2">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Package className="h-5 w-5" />
              Cart Snapshot
            </div>
            <CardDescription className="pl-2">
              {ctx.label} example
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {ctx.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-xs text-muted-foreground">{item.category}</div>
                  </div>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold mt-2">
                <span>Total Value:</span>
                <span>
                  $
                  {ctx.items.reduce((sum, it) => sum + it.price, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI SIMULATION PANEL */}
        <Card className="border-success/30 bg-success/5 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-success to-coupon-green rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-success">AI Recommends</h3>
                <p className="text-sm text-muted-foreground">
                  For this cart & shopper type
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant="secondary"
                  className="bg-success text-success-foreground"
                >
                  {ctx.ai.confidence}% confidence
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Suggested Coupon Code
                  </div>
                  <div className="text-xl font-bold text-primary mb-1">
                    {ctx.ai.couponCode}
                  </div>
                  <div className="text-lg font-semibold text-success">
                    {ctx.ai.discount}
                  </div>
                </div>

                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Expected Uplift
                  </div>
                  <div className="text-2xl font-bold text-success flex items-center gap-1">
                    <TrendingUp className="h-5 w-5" />
                    {ctx.ai.expectedUplift}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground mb-2">
                    Why this coupon?
                  </div>
                  <p className="text-sm">{ctx.ai.rationale}</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Category Trend</span>
                      <span className="text-success">{ctx.ai.trend}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Optimal Discount Range</span>
                      <span className="text-muted-foreground">{ctx.ai.optimal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              <Button variant="gradient" className="flex-1">
                Use {ctx.ai.couponCode}
              </Button>
              <Button variant="outline">
                Try Another Scenario
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* METRICS PANEL */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {ctx.meta.relevance}
            </div>
            <div className="text-sm text-muted-foreground">Coupon Relevance</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {ctx.meta.gain}
            </div>
            <div className="text-sm text-muted-foreground">
              Avg Conversion Gain
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-info">
              {ctx.meta.roi}
            </div>
            <div className="text-sm text-muted-foreground">ROI Potential</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
