import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
    DataTable,
    StatusBadge,
    ActionBar,
    PrimaryButton
} from "../components/DashboardComponents";
import {
    Plus,
    Search,
    Filter,
    ChevronDown,
    X,
    CheckCircle2
} from "lucide-react";

interface Expense {
    id: string;
    driver: string;
    distance: string;
    fuelExpense: string;
    miscExpense: string;
    status: string;
}

export default function ExpenseLogging() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const expenses: Expense[] = [
        { id: "321", driver: "John", distance: "1000 km", fuelExpense: "14k", miscExpense: "3k", status: "Done" },
        { id: "322", driver: "Jane", distance: "450 km", fuelExpense: "6k", miscExpense: "1k", status: "Pending" },
        { id: "323", driver: "Mike", distance: "1200 km", fuelExpense: "18k", miscExpense: "5k", status: "Done" },
    ];

    const columns = [
        { key: "id", label: "Trip ID" },
        { key: "driver", label: "Driver" },
        { key: "distance", label: "Distance" },
        { key: "fuelExpense", label: "Fuel Expense" },
        { key: "miscExpense", label: "Misc. Expen" },
        {
            key: "status",
            label: "Status",
            render: (item: Expense) => (
                <StatusBadge
                    status={item.status}
                    type={item.status === 'Done' ? 'success' : 'warning'}
                />
            )
        },
    ];

    return (
        <DashboardLayout role="finance_analyst">
            <ActionBar title="Expense & Fuel Logging">
                <PrimaryButton
                    label="Add an Expense"
                    icon={Plus}
                    onClick={() => setIsModalOpen(true)}
                />
            </ActionBar>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6">
                <div className="header-search flex-1 max-w-sm">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search for..." className="search-input" />
                </div>
                <button className="icon-btn-secondary flex items-center gap-2 px-4 w-auto">
                    <span>Group by</span>
                    <ChevronDown size={14} />
                </button>
                <button className="icon-btn-secondary flex items-center gap-2 px-4 w-auto">
                    <Filter size={16} />
                    <span>Filter</span>
                </button>
                <button className="icon-btn-secondary flex items-center gap-2 px-4 w-auto">
                    <span>Sort by...</span>
                    <ChevronDown size={14} />
                </button>
            </div>

            <DataTable
                title="Wallet Logs"
                columns={columns}
                data={expenses}
            />

            {/* New Expense Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content max-w-lg">
                        <div className="modal-header border-b pb-4 mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">New Expense Log</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="form-group border-l-4 border-indigo-500 pl-4 py-1">
                                <label className="block text-xs font-bold text-indigo-400 uppercase mb-1">Trip ID:</label>
                                <input type="text" className="premium-input w-full bg-[#0a0a0f]" placeholder="Enter Trip ID" />
                            </div>
                            <div className="form-group border-l-4 border-indigo-500 pl-4 py-1">
                                <label className="block text-xs font-bold text-indigo-400 uppercase mb-1">Driver:</label>
                                <input type="text" className="premium-input w-full bg-[#0a0a0f]" placeholder="Driver name" />
                            </div>
                            <div className="form-group border-l-4 border-indigo-500 pl-4 py-1">
                                <label className="block text-xs font-bold text-indigo-400 uppercase mb-1">Fuel Cost:</label>
                                <input type="text" className="premium-input w-full bg-[#0a0a0f]" placeholder="Amount" />
                            </div>
                            <div className="form-group border-l-4 border-indigo-500 pl-4 py-1">
                                <label className="block text-xs font-bold text-indigo-400 uppercase mb-1">Misc Expense:</label>
                                <input type="text" className="premium-input w-full bg-[#0a0a0f]" placeholder="Repair, tolls, etc." />
                            </div>
                        </div>

                        <div className="modal-footer mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg border border-border text-muted font-semibold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button className="premium-btn-primary px-8" style={{ background: 'var(--emerald)' }}>
                                <CheckCircle2 size={18} />
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
