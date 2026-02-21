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

interface Vehicle {
    id: string;
    plate: string;
    model: string;
    type: string;
    capacity: string;
    odometer: string;
    status: string;
}

export default function VehicleRegistry() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const vehicles: Vehicle[] = [
        { id: "1", plate: "MH 00", model: "2017", type: "Mini", capacity: "5 tonn", odometer: "79000", status: "Idle" },
        { id: "2", plate: "KA 01", model: "2019", type: "Heavy", capacity: "12 tonn", odometer: "45000", status: "Active" },
        { id: "3", plate: "DL 03", model: "2021", type: "Medium", capacity: "8 tonn", odometer: "21000", status: "Maintenance" },
    ];

    const columns = [
        { key: "id", label: "NO" },
        { key: "plate", label: "Plate" },
        { key: "model", label: "Model" },
        { key: "type", label: "Type" },
        { key: "capacity", label: "Capacity" },
        { key: "odometer", label: "Odometer" },
        {
            key: "status",
            label: "Status",
            render: (item: Vehicle) => (
                <StatusBadge
                    status={item.status}
                    type={item.status === 'Idle' ? 'neutral' : item.status === 'Active' ? 'success' : 'warning'}
                />
            )
        },
    ];

    return (
        <DashboardLayout role="fleet_manager">
            <ActionBar title="Vehicle Registry">
                <PrimaryButton
                    label="New Vehicle"
                    icon={Plus}
                    onClick={() => setIsModalOpen(true)}
                />
            </ActionBar>

            {/* Controls as per wireframe */}
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
                title="Asset Management"
                columns={columns}
                data={vehicles}
            />

            {/* New Vehicle Registration Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content max-w-lg">
                        <div className="modal-header border-b pb-4 mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">New Vehicle Registration</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">License Plate:</label>
                                <input type="text" className="premium-input w-full" placeholder="Enter plate number" />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Max Payload:</label>
                                <input type="text" className="premium-input w-full" placeholder="e.g. 5 tons" />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Initial Odometer:</label>
                                <input type="number" className="premium-input w-full" placeholder="e.g. 0" />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Type:</label>
                                <select className="premium-input w-full bg-secondary">
                                    <option>Mini</option>
                                    <option>Medium</option>
                                    <option>Heavy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-semibold text-muted mb-1">Model:</label>
                                <input type="text" className="premium-input w-full" placeholder="e.g. 2023 Volvo FH16" />
                            </div>
                        </div>

                        <div className="modal-footer mt-8 flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg border border-border text-muted font-semibold hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button className="premium-btn-primary px-8">
                                <Save size={18} />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
