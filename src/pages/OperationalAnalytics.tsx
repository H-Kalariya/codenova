import DashboardLayout from "../components/DashboardLayout";
import {
    StatCard,
    DataTable,
    ActionBar
} from "../components/DashboardComponents";
import {
    Download,
    TrendingUp,
    BarChart3,
    PieChart
} from "lucide-react";

export default function OperationalAnalytics() {
    const analyticsStats = [
        { label: "Total Fuel Cost", value: "Rs. 2.6 L", trend: { value: "3.2%", isUp: false }, color: "#ef4444", icon: TrendingUp },
        { label: "Fleet ROI", value: "+ 12.5%", trend: { value: "0.8%", isUp: true }, color: "#10b981", icon: BarChart3 },
        { label: "Utilization Rate", value: "82%", trend: { value: "2.1%", isUp: true }, color: "#6366f1", icon: PieChart },
    ];

    const financialData = [
        { id: "1", month: "Jan", revenue: "Rs. 17L", fuel: "Rs. 6L", maintenance: "Rs. 2L", profit: "Rs. 9L" },
        { id: "2", month: "Feb", revenue: "Rs. 15.5L", fuel: "Rs. 5.5L", maintenance: "Rs. 1.8L", profit: "Rs. 8.2L" },
        { id: "3", month: "Mar", revenue: "Rs. 19L", fuel: "Rs. 7L", maintenance: "Rs. 2.5L", profit: "Rs. 9.5L" },
    ];

    const columns = [
        { key: "month", label: "Month" },
        { key: "revenue", label: "Revenue" },
        { key: "fuel", label: "Fuel Cost" },
        { key: "maintenance", label: "Maintenance" },
        {
            key: "profit",
            label: "Net Profit",
            render: (item: any) => <span className="font-bold text-emerald-500">{item.profit}</span>
        },
    ];

    return (
        <DashboardLayout role="finance_analyst">
            <ActionBar title="Operational Analytics & Financial Reports">
                <button className="premium-btn-primary px-6 bg-[#1a1a2e] border border-blue-500/30 text-blue-400">
                    <Download size={18} />
                    Financial Summary of Month
                </button>
            </ActionBar>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {analyticsStats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Fuel Efficiency Trend - Simple SVG Chart */}
                <div className="bg-secondary p-8 rounded-2xl border border-border">
                    <h3 className="text-lg font-bold mb-6 text-muted uppercase tracking-widest text-center">Fuel Efficiency Trend (km/L)</h3>
                    <div className="h-48 w-full flex items-end justify-between px-4 relative">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                            <path d="M0 150 L50 120 L100 160 L150 100 L200 130 L250 80 L300 110 L350 40 L400 60"
                                fill="none" stroke="var(--indigo)" strokeWidth="3" />
                            <path d="M0 150 L50 120 L100 160 L150 100 L200 130 L250 80 L300 110 L350 40 L400 60 L400 200 L0 200 Z"
                                fill="rgba(99, 102, 241, 0.1)" />
                        </svg>
                        <div className="text-[10px] text-muted absolute bottom-[-20px] left-0">Jan</div>
                        <div className="text-[10px] text-muted absolute bottom-[-20px] left-[25%] text-center w-20">Feb</div>
                        <div className="text-[10px] text-muted absolute bottom-[-20px] left-[50%] text-center w-20">Mar</div>
                        <div className="text-[10px] text-muted absolute bottom-[-20px] right-0">Dec</div>
                    </div>
                </div>

                {/* Top 5 Costliest Vehicles - Simple CSS Bar Chart */}
                <div className="bg-secondary p-8 rounded-2xl border border-border">
                    <h3 className="text-lg font-bold mb-6 text-muted uppercase tracking-widest text-center">Top 5 Costliest Vehicles</h3>
                    <div className="h-48 flex items-end justify-around gap-4 px-4">
                        <div className="flex flex-col items-center flex-1">
                            <div className="bg-gradient-to-t from-red-500/10 to-red-500 w-full rounded-t-lg" style={{ height: '30%' }} />
                            <span className="text-[8px] text-muted mt-2 rotate-[-45deg]">MH-00</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="bg-gradient-to-t from-red-500/10 to-red-500 w-full rounded-t-lg" style={{ height: '45%' }} />
                            <span className="text-[8px] text-muted mt-2 rotate-[-45deg]">TRK-22</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="bg-gradient-to-t from-red-500/10 to-red-500 w-full rounded-t-lg" style={{ height: '20%' }} />
                            <span className="text-[8px] text-muted mt-2 rotate-[-45deg]">MH-01</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="bg-gradient-to-t from-red-500/10 to-red-500 w-full rounded-t-lg" style={{ height: '80%' }} />
                            <span className="text-[8px] text-muted mt-2 rotate-[-45deg]">TRK-55</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <div className="bg-gradient-to-t from-red-500/10 to-red-500 w-full rounded-t-lg" style={{ height: '55%' }} />
                            <span className="text-[8px] text-muted mt-2 rotate-[-45deg]">KA-22</span>
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                title="Yearly Financial Breakdown"
                columns={columns}
                data={financialData}
            />
        </DashboardLayout>
    );
}
