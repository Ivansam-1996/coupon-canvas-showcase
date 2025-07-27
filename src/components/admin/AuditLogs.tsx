import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, User, Edit, Trash2, Plus, Eye } from "lucide-react";

export function AuditLogs() {
  const logs = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      action: "created",
      target: "SUMMER25 coupon",
      timestamp: "2 minutes ago",
      details: "20% discount, expires June 30",
      icon: Plus,
      color: "text-success"
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: "MC",
      action: "modified",
      target: "WELCOME10 usage limit",
      timestamp: "15 minutes ago",
      details: "Changed from 500 to 1000 uses",
      icon: Edit,
      color: "text-warning"
    },
    {
      id: 3,
      user: "Lisa Wong",
      avatar: "LW",
      action: "viewed",
      target: "Analytics dashboard",
      timestamp: "1 hour ago",
      details: "Accessed performance metrics",
      icon: Eye,
      color: "text-info"
    },
    {
      id: 4,
      user: "Tom Smith",
      avatar: "TS",
      action: "deleted",
      target: "EXPIRED50 coupon",
      timestamp: "3 hours ago",
      details: "Removed expired promotional code",
      icon: Trash2,
      color: "text-destructive"
    }
  ];

  return (
    <Card className="shadow-elegant">
      <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Audit Logs
        </CardTitle>
        <CardDescription className="text-white/80">
          Track all system changes and user activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
              style={{ animationDelay: `${log.id * 100}ms` }}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {log.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{log.user}</span>
                  <Badge variant="outline" className="text-xs">
                    {log.action}
                  </Badge>
                  <log.icon className={`h-4 w-4 ${log.color}`} />
                </div>
                
                <div className="text-sm text-muted-foreground mb-1">
                  {log.action} <span className="font-medium text-foreground">{log.target}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {log.details}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {log.timestamp}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:underline">
            Load more entries
          </button>
        </div>
      </CardContent>
    </Card>
  );
}