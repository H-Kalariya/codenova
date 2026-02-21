import DashboardLayout from "../components/DashboardLayout";
import {
    StatCard,
    DataTable,
    StatusBadge,
    ActionBar,
    PrimaryButton
} from "../components/DashboardComponents";
import {
    Truck,
    Navigation,
    Activity,
    Plus,
    AlertTriangle,
    Package
} from "lucide-react";

export default function FleetManagerDashboard() {
    const stats = [
        {
            label: "Active Fleet",
            value: "220",
            trend: { value: "12%", isUp: true },
            color: "#6366f1",
            icon: Truck
        },
        {
            label: "Maintenance Alerts",
            value: "180",
            trend: { value: "5%", isUp: false },
            color: "#f59e0b",
            icon: AlertTriangle
        },
        {
            label: "Pending Cargo",
            value: "20",
            meta: "Ready to ship",
            color: "#10b981",
            icon: Package
        },
        {
            label: "Utilization Rate",
            value: "87%",
            trend: { value: "4%", isUp: true },
            color: "#3b82f6",
            icon: Activity
        },
    ];

    const fleetData = [
        { id: "1", trip: "TRP-8820", vehicle: "Volvo FH16 - GV-9920", driver: "John Doe", status: "On Trip", type: "success" },
        { id: "2", trip: "TRP-8821", vehicle: "Scania R500 - AX-1102", driver: "Sarah Smith", status: "Maintenance", type: "warning" },
        { id: "3", trip: "TRP-8822", vehicle: "Mercedes Actros - KL-4491", driver: "Michael Ross", status: "Ready", type: "info" },
        { id: "4", trip: "TRP-8823", vehicle: "MAN TGX - RT-2231", driver: "Emma Wilson", status: "On Trip", type: "success" },
        { id: "5", trip: "TRP-8824", vehicle: "Iveco S-Way - NM-8812", driver: "David Brown", status: "Delayed", type: "error" },
    ];

    const columns = [
        { key: "trip", label: "Trip ID" },
        {
            key: "vehicle",
            label: "Vehicle",
            render: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-indigo">
                        <Truck size={16} />
                    </div>
                    <span>{item.vehicle}</span>
                </div>
            )
        },
        {
            key: "driver",
            label: "Driver",
            render: (item: any) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo/20 flex items-center justify-center text-[10px] font-bold">
                        {item.driver.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span>{item.driver}</span>
                </div>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (item: any) => <StatusBadge status={item.status} type={item.type} />
        },
    ];

    return (
        <DashboardLayout role="fleet_manager">
            <ActionBar title="Fleet Overview">
                <div className="flex gap-3">
                    <PrimaryButton label="New Trip" icon={Navigation} />
                    <PrimaryButton label="New Vehicle" icon={Plus} />
                </div>
            </ActionBar>

            <div className="stats-grid mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                ))}
            </div>

            <DataTable
                title="Live Operations"
                columns={columns}
                data={fleetData}
            />
        </DashboardLayout>
    );
}
