import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ShoppingCart, TrendingUp, Zap } from "lucide-react";

export function AICouponEngine() {
  const mockCart = {
    items: [
      { name: "Wireless Headphones", price: 99.99, category: "Electronics" },
      { name: "Coffee Mug", price: 14.99, category: "Home" }
    ],
    total: 114.98
  };

  const aiRecommendation = {
    coupon: "ELECTRONICS15",
    discount: "15% OFF",
    rationale: "Customer frequently purchases electronics and has headphones in cart",
    expectedUplift: "+23%",
    confidence: 92
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-green to-success text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Coupon Engine
          <Badge variant="secondary" className="bg-warning text-warning-foreground">MVP</Badge>
          <Badge variant="secondary" className="bg-info text-info-foreground">USP</Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          AI-powered coupon recommendations based on customer behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Mock Cart */}
        <Card className="border-muted">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Current Cart Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCart.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-muted-foreground">{item.category}</div>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>${mockCart.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendation */}
        <Card className="border-success/30 bg-success/5 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-success to-coupon-green rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-success">AI Recommends</h3>
                <p className="text-sm text-muted-foreground">Optimized for this customer</p>
              </div>
              <div className="ml-auto">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  {aiRecommendation.confidence}% confidence
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground">Recommended Coupon</div>
                  <div className="text-xl font-bold text-primary">{aiRecommendation.coupon}</div>
                  <div className="text-lg font-semibold text-success">{aiRecommendation.discount}</div>
                </div>
                
                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground">Expected Uplift</div>
                  <div className="text-2xl font-bold text-success flex items-center gap-1">
                    <TrendingUp className="h-5 w-5" />
                    {aiRecommendation.expectedUplift}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-sm text-muted-foreground mb-2">AI Rationale</div>
                  <p className="text-sm">{aiRecommendation.rationale}</p>
                  
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Purchase History Match</span>
                      <span className="text-success">High</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Category Affinity</span>
                      <span className="text-success">Electronics</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Price Sensitivity</span>
                      <span className="text-warning">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="gradient" className="flex-1">
                Apply AI Recommendation
              </Button>
              <Button variant="outline">
                Generate Alternative
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">94%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">+31%</div>
            <div className="text-sm text-muted-foreground">Avg Conversion</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-info">2.4x</div>
            <div className="text-sm text-muted-foreground">ROI Improvement</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}