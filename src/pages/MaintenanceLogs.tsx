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
    Save
} from "lucide-react";

interface ServiceRecord {
    id: string;
    vehicle: string;
    issue: string;
    date: string;
    cost: string;
    status: string;
}

export default function MaintenanceLogs() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const records: ServiceRecord[] = [
        { id: "321", vehicle: "TATA", issue: "Engine Issue", date: "20/02", cost: "10k", status: "New" },
        { id: "320", vehicle: "VOLVO", issue: "Oil Change", date: "18/02", cost: "5k", status: "In Shop" },
        { id: "319", vehicle: "EICHER", issue: "Brake Pad Replacement", date: "15/02", cost: "8k", status: "Completed" },
    ];

    const columns = [
        { key: "id", label: "Log ID" },
        { key: "vehicle", label: "Vehicle" },
        { key: "issue", label: "Issue/Service" },
        { key: "date", label: "Date" },
        { key: "cost", label: "Cost" },
        {
            key: "status",
            label: "Status",
            render: (item: ServiceRecord) => (
                <StatusBadge
                    status={item.status}
                    type={item.status === 'New' ? 'warning' : item.status === 'In Shop' ? 'info' : 'success'}
                />
            )
        },
    ];

    return (
        <DashboardLayout role="fleet_manager">
            <ActionBar title="Maintenance & Service Logs">
                <PrimaryButton
                    label="Create New Service"
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
                title="Service Records"
                columns={columns}
                data={records}
            />

            {/* New Service Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content max-w-lg">
                        <div className="modal-header border-b pb-4 mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">New Service Log</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Vehicle Name:</label>
                                <select className="premium-input w-full bg-secondary">
                                    <option>TATA Prima</option>
                                    <option>VOLVO FH16</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Issue/Service:</label>
                                <input type="text" className="premium-input w-full" placeholder="e.g. Engine Repair, Oil Change" />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Date:</label>
                                <input type="date" className="premium-input w-full" />
                            </div>
                        </div>

                        <div className="modal-footer mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg border border-border text-muted font-semibold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button className="premium-btn-primary px-8" style={{ background: 'var(--red)' }}>
                                <Save size={18} />
                                Create
                            </button>
                        </div>
                        <p className="mt-4 text-[10px] text-muted text-center uppercase tracking-widest opacity-50">
                            Vehicle will be automatically marked "In Shop"
                        </p>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
