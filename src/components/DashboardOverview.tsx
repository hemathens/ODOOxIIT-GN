import { TrendingUp, Users, Receipt, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "24",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "8 urgent",
      icon: Receipt,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Approved This Month",
      value: "145",
      change: "+22% from last month",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Expenses",
      value: "$45,890",
      change: "+12% vs last month",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your expense management.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Emily Davis", action: "submitted an expense", amount: "$234.50", time: "2 hours ago" },
              { user: "John Smith", action: "approved expense for", amount: "$1,250.00", time: "4 hours ago" },
              { user: "Michael Brown", action: "submitted an expense", amount: "$89.99", time: "5 hours ago" },
              { user: "Sarah Johnson", action: "updated approval rule", amount: "", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-sm">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span>{activity.user}</span> {activity.action} {activity.amount && <span>{activity.amount}</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
