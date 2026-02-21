import DashboardLayout from "../components/DashboardLayout";
import {
    StatCard,
    DataTable,
    StatusBadge,
    ActionBar,
    PrimaryButton
} from "../components/DashboardComponents";
import {
    ShieldCheck,
    AlertTriangle,
    Clock,
    FileText,
    Plus,
    History
} from "lucide-react";

export default function SafetyOfficerDashboard() {
    const stats = [
        {
            label: "Incident-Free Days",
            value: "128",
            trend: { value: "14", isUp: true },
            color: "#10b981",
            icon: ShieldCheck
        },
        {
            label: "Open Violations",
            value: "3",
            trend: { value: "1", isUp: false },
            color: "#ef4444",
            icon: AlertTriangle
        },
        {
            label: "Pending Audits",
            value: "8",
            meta: "Next review in 2 days",
            color: "#f59e0b",
            icon: Clock
        },
        {
            label: "Compliance Score",
            value: "98%",
            trend: { value: "0.5%", isUp: true },
            color: "#3b82f6",
            icon: ShieldCheck
        },
    ];

    const safetyData = [
        { id: "1", report: "SR-5501", area: "Vehicle Maintenance", severity: "Low", status: "Resolved", type: "success" },
        { id: "2", report: "SR-5502", area: "Driver Rest Periods", severity: "High", status: "Open", type: "error" },
        { id: "3", report: "SR-5503", area: "Cargo Securement", severity: "Medium", status: "Under Review", type: "warning" },
        { id: "4", report: "SR-5504", area: "Equipment Inspection", severity: "Low", status: "Resolved", type: "success" },
        { id: "5", report: "SR-5505", area: "Route Risk Assessment", severity: "Medium", status: "Open", type: "error" },
    ];

    const columns = [
        { key: "report", label: "Report ID" },
        { key: "area", label: "Safety Area" },
        {
            key: "severity",
            label: "Severity",
            render: (item: any) => (
                <span style={{
                    color: item.severity === 'High' ? '#ef4444' : item.severity === 'Medium' ? '#f59e0b' : '#10b981',
                    fontWeight: 600
                }}>
                    {item.severity}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (item: any) => <StatusBadge status={item.status} type={item.type} />
        },
    ];

    return (
        <DashboardLayout role="safety_officer">
            <ActionBar title="Safety & Compliance">
                <div className="flex gap-3">
                    <PrimaryButton label="Safety Logs" icon={History} />
                    <PrimaryButton label="File Report" icon={Plus} />
                </div>
            </ActionBar>

            <div className="stats-grid mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                ))}
            </div>

            <DataTable
                title="Recent Incidents & Audits"
                columns={columns}
                data={safetyData}
            />
        </DashboardLayout>
    );
}
