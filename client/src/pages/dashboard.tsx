import { useQuery } from "@tanstack/react-query";
import KPICard from "@/components/dashboard/kpi-card";
import KanbanBoard from "@/components/dashboard/kanban-board";
import ActivityFeed from "@/components/dashboard/activity-feed";
import RevenueChart from "@/components/dashboard/revenue-chart";
import TopProducts from "@/components/dashboard/top-products";
import TodoList from "@/components/dashboard/todo-list";
import CalendarEvents from "@/components/dashboard/calendar-events";

export default function Dashboard() {
  const { data: kpis, isLoading: kpisLoading } = useQuery<any>({
    queryKey: ["/api/dashboard/kpis"],
  });

  const { data: opportunities = [], isLoading: opportunitiesLoading } = useQuery<any[]>({
    queryKey: ["/api/opportunities"],
  });

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="dashboard-content">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground" data-testid="dashboard-title">
          My Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="dashboard-subtitle">
          Welcome back! Here's what's happening in your business.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${(kpis as any)?.revenue?.toLocaleString() || '0'}`}
          change="+12.5% from last month"
          changeType="positive"
          icon="fas fa-dollar-sign"
          color="green"
          loading={kpisLoading}
          data-testid="kpi-revenue"
        />
        <KPICard
          title="New Customers"
          value={(kpis as any)?.customers?.toString() || '0'}
          change="+8.2% from last month"
          changeType="positive"
          icon="fas fa-users"
          color="blue"
          loading={kpisLoading}
          data-testid="kpi-customers"
        />
        <KPICard
          title="Open Opportunities"
          value={(kpis as any)?.opportunities?.toString() || '0'}
          change="+5.1% from last month"
          changeType="positive"
          icon="fas fa-chart-line"
          color="orange"
          loading={kpisLoading}
          data-testid="kpi-opportunities"
        />
        <KPICard
          title="Inventory Value"
          value={`$${(kpis as any)?.inventory?.toLocaleString() || '0'}`}
          change="-2.1% from last month"
          changeType="negative"
          icon="fas fa-boxes"
          color="red"
          loading={kpisLoading}
          data-testid="kpi-inventory"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sales Pipeline */}
        <div className="col-span-12 lg:col-span-8">
          <KanbanBoard 
            opportunities={opportunities}
            loading={opportunitiesLoading}
            data-testid="sales-pipeline"
          />
        </div>

        {/* Recent Activities */}
        <div className="col-span-12 lg:col-span-4">
          <ActivityFeed data-testid="activity-feed" />
        </div>

        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-6">
          <RevenueChart data-testid="revenue-chart" />
        </div>

        {/* Top Products */}
        <div className="col-span-12 lg:col-span-6">
          <TopProducts data-testid="top-products" />
        </div>

        {/* To-Do & Calendar */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TodoList data-testid="todo-list" />
            <CalendarEvents data-testid="calendar-events" />
          </div>
        </div>
      </div>
    </div>
  );
}
