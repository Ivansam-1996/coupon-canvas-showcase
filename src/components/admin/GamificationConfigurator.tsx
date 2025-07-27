import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Gift, Sparkles, RotateCcw, Settings } from "lucide-react";
import { useState } from "react";

export function GamificationConfigurator() {
  const [selectedGame, setSelectedGame] = useState<string>("scratch");

  const gameTypes = [
    {
      id: "scratch",
      title: "Scratch Card",
      desc: "Reveal hidden discounts",
      icon: Sparkles,
      preview: (
        <div className="relative w-full h-32 bg-gradient-coupon rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-300/80 rounded-lg flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-gray-600" />
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs font-bold">
            Scratch to reveal!
          </div>
        </div>
      )
    },
    {
      id: "wheel",
      title: "Spin the Wheel",
      desc: "Spin for random rewards",
      icon: RotateCcw,
      preview: (
        <div className="relative w-full h-32 bg-gradient-to-r from-coupon-purple to-coupon-blue rounded-lg flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center animate-float">
            <RotateCcw className="h-8 w-8 text-white animate-pulse" />
          </div>
        </div>
      )
    },
    {
      id: "mystery",
      title: "Mystery Box",
      desc: "Open boxes for surprises",
      icon: Gift,
      preview: (
        <div className="relative w-full h-32 bg-gradient-to-r from-coupon-orange to-coupon-red rounded-lg flex items-center justify-center">
          <div className="relative">
            <Gift className="h-12 w-12 text-white animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-ping"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-coupon-purple to-coupon-orange text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          Gamification Configurator
          <Badge variant="secondary" className="bg-warning text-warning-foreground">NEW</Badge>
          <Badge variant="secondary" className="bg-info text-info-foreground">USP</Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          Create engaging game experiences for coupon distribution
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gameTypes.map((game) => (
            <div
              key={game.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedGame === game.id 
                  ? 'ring-2 ring-primary shadow-glow' 
                  : 'hover:shadow-elegant'
              }`}
              onClick={() => setSelectedGame(game.id)}
            >
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="mb-3">
                    {game.preview}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <game.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{game.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{game.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {selectedGame && (
          <Card className="border-primary/20 bg-primary/5 animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  {gameTypes.find(g => g.id === selectedGame)?.title} Configuration
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded border">
                    <label className="block text-sm font-medium mb-1">Winning Probability</label>
                    <div className="text-2xl font-bold text-success">75%</div>
                    <p className="text-xs text-muted-foreground">Chance of revealing a discount</p>
                  </div>
                  
                  <div className="p-3 bg-background rounded border">
                    <label className="block text-sm font-medium mb-1">Reward Tiers</label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>10% OFF</span>
                        <span className="text-muted-foreground">40%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>20% OFF</span>
                        <span className="text-muted-foreground">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>30% OFF</span>
                        <span className="text-muted-foreground">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-background rounded border">
                    <label className="block text-sm font-medium mb-1">Engagement Requirements</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" defaultChecked />
                        Minimum cart value: $25
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Social media share required
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Email signup required
                      </label>
                    </div>
                  </div>

                  <div className="p-3 bg-background rounded border">
                    <label className="block text-sm font-medium mb-1">Daily Limits</label>
                    <div className="text-lg font-semibold">500 plays/day</div>
                    <p className="text-xs text-muted-foreground">Prevent gaming the system</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button variant="gradient" className="flex-1">
                  Deploy Game
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}