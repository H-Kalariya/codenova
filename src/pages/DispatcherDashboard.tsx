import DashboardLayout from "../components/DashboardLayout";
import {
    StatCard,
    DataTable,
    StatusBadge,
    ActionBar,
    PrimaryButton
} from "../components/DashboardComponents";
import {
    UserPlus,
    Calendar,
    MapPin,
    Clock,
    Plus,
    CheckCircle2
} from "lucide-react";

export default function DispatcherDashboard() {
    const stats = [
        {
            label: "Available Drivers",
            value: "42",
            trend: { value: "8%", isUp: true },
            color: "#10b981",
            icon: UserPlus
        },
        {
            label: "Active Trips",
            value: "86",
            trend: { value: "15%", isUp: true },
            color: "#6366f1",
            icon: MapPin
        },
        {
            label: "Pending Assignments",
            value: "12",
            trend: { value: "2", isUp: false },
            color: "#f59e0b",
            icon: Clock
        },
        {
            label: "Completed Today",
            value: "124",
            trend: { value: "10%", isUp: true },
            color: "#3b82f6",
            icon: CheckCircle2
        },
    ];

    const dispatchData = [
        { id: "1", trip: "TRP-9001", driver: "Alice Cooper", vehicle: "Truck A1", route: "New York → Boston", status: "On Way", type: "success" },
        { id: "2", trip: "TRP-9002", driver: "Bob Marley", vehicle: "Van V2", route: "Chicago → Detroit", status: "Pending", type: "warning" },
        { id: "3", trip: "TRP-9003", driver: "Charlie Day", vehicle: "Truck A3", route: "Miami → Orlando", status: "Loading", type: "info" },
        { id: "4", trip: "TRP-9004", driver: "Diana Ross", vehicle: "Truck B1", route: "Seattle → Portland", status: "Assigned", type: "neutral" },
        { id: "5", trip: "TRP-9005", driver: "Edward Norton", vehicle: "Van V5", route: "Austin → Dallas", status: "On Way", type: "success" },
    ];

    const columns = [
        { key: "trip", label: "Trip ID" },
        {
            key: "route",
            label: "Route",
            render: (item: any) => (
                <div className="flex flex-col">
                    <span className="font-medium text-primary">{item.route}</span>
                    <span className="text-xs text-muted">{item.vehicle}</span>
                </div>
            )
        },
        { key: "driver", label: "Driver" },
        {
            key: "status",
            label: "Status",
            render: (item: any) => <StatusBadge status={item.status} type={item.type} />
        },
    ];

    return (
        <DashboardLayout role="dispatcher">
            <ActionBar title="Trip Dispatcher">
                <div className="flex gap-3">
                    <PrimaryButton label="Calendar View" icon={Calendar} />
                    <PrimaryButton label="New Assignment" icon={Plus} />
                </div>
            </ActionBar>

            <div className="stats-grid mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                ))}
            </div>

            <DataTable
                title="Active Dispatches"
                columns={columns}
                data={dispatchData}
            />
        </DashboardLayout>
    );
}
