import DashboardLayout from "../components/DashboardLayout";
import {
    StatCard,
    DataTable,
    StatusBadge,
    ActionBar,
    PrimaryButton
} from "../components/DashboardComponents";
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    BarChart2,
    Plus,
    Download
} from "lucide-react";

export default function FinanceAnalystDashboard() {
    const stats = [
        {
            label: "Monthly Revenue",
            value: "$428.5k",
            trend: { value: "12%", isUp: true },
            color: "#10b981",
            icon: DollarSign
        },
        {
            label: "Fuel Expenses",
            value: "$142.2k",
            trend: { value: "4%", isUp: false },
            color: "#ef4444",
            icon: TrendingUp
        },
        {
            label: "Pending Invoices",
            value: "24",
            meta: "$18.4k outstanding",
            color: "#f59e0b",
            icon: CreditCard
        },
        {
            label: "Net Margin",
            value: "28.4%",
            trend: { value: "2.1%", isUp: true },
            color: "#3b82f6",
            icon: BarChart2
        },
    ];

    const financeData = [
        { id: "1", invoice: "INV-2001", client: "Global Logistics", amount: "$12,400", date: "2023-11-20", status: "Paid", type: "success" },
        { id: "2", invoice: "INV-2002", client: "FastTrack Inc", amount: "$8,200", date: "2023-11-21", status: "Pending", type: "warning" },
        { id: "3", invoice: "INV-2003", client: "City Delivery Co", amount: "$15,750", date: "2023-11-22", status: "Sent", type: "info" },
        { id: "4", invoice: "INV-2004", client: "Harbor Freight", amount: "$6,100", date: "2023-11-22", status: "Paid", type: "success" },
        { id: "5", invoice: "INV-2005", client: "Summit Transport", amount: "$9,300", date: "2023-11-23", status: "Overdue", type: "error" },
    ];

    const columns = [
        { key: "invoice", label: "Invoice #" },
        { key: "client", label: "Client" },
        { key: "amount", label: "Amount" },
        { key: "date", label: "Due Date" },
        {
            key: "status",
            label: "Status",
            render: (item: any) => <StatusBadge status={item.status} type={item.type} />
        },
    ];

    return (
        <DashboardLayout role="finance_analyst">
            <ActionBar title="Financial Insights">
                <div className="flex gap-3">
                    <PrimaryButton label="Export PDF" icon={Download} />
                    <PrimaryButton label="Create Invoice" icon={Plus} />
                </div>
            </ActionBar>

            <div className="stats-grid mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {stats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                ))}
            </div>

            <DataTable
                title="Recent Transactions"
                columns={columns}
                data={financeData}
            />
        </DashboardLayout>
    );
}
