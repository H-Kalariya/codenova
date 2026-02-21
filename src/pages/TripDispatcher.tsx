import DashboardLayout from "../components/DashboardLayout";
import {
    DataTable,
    StatusBadge,
    ActionBar
} from "../components/DashboardComponents";
import {
    Search,
    Filter,
    ChevronDown,
    Send
} from "lucide-react";

interface Trip {
    id: string;
    fleetType: string;
    origin: string;
    destination: string;
    status: string;
}

export default function TripDispatcher() {
    const trips: Trip[] = [
        { id: "1", fleetType: "Trailer Truck", origin: "Mumbai", destination: "Pune", status: "On way" },
        { id: "2", fleetType: "Mini Van", origin: "Delhi", destination: "Agra", status: "Pending" },
        { id: "3", fleetType: "Flatbed", origin: "Bangalore", destination: "Chennai", status: "Completed" },
    ];

    const columns = [
        { key: "id", label: "NO" },
        { key: "fleetType", label: "Trip Fleet Type" },
        { key: "origin", label: "Origin" },
        { key: "destination", label: "Destination" },
        {
            key: "status",
            label: "Status",
            render: (item: Trip) => (
                <StatusBadge
                    status={item.status}
                    type={item.status === 'On way' ? 'info' : item.status === 'Completed' ? 'success' : 'warning'}
                />
            )
        },
    ];

    return (
        <DashboardLayout role="dispatcher">
            <ActionBar title="Trip Dispatcher & Management" />

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
                title="Active Trips"
                columns={columns}
                data={trips}
            />

            {/* New Trip Form - integrated at bottom as per wireframe */}
            <div className="mt-8 p-6 bg-secondary border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                    <h2 className="text-xl font-bold">New Trip Form</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Select Vehicle:</label>
                        <select className="premium-input w-full bg-[#0f0f15]">
                            <option>Volvo FH16 (MH 00)</option>
                            <option>Tata Prima (KA 01)</option>
                        </select>
                    </div>
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Cargo Weight (Kg):</label>
                        <input type="number" className="premium-input w-full bg-[#0f0f15]" placeholder="e.g. 1500" />
                    </div>
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Select Driver:</label>
                        <select className="premium-input w-full bg-[#0f0f15]">
                            <option>John Doe (License: 23223)</option>
                            <option>Jane Smith (License: 45445)</option>
                        </select>
                    </div>
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Origin Address:</label>
                        <input type="text" className="premium-input w-full bg-[#0f0f15]" placeholder="e.g. Warehouse 1, Mumbai" />
                    </div>
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Destination:</label>
                        <input type="text" className="premium-input w-full bg-[#0f0f15]" placeholder="e.g. Pune Distribution Center" />
                    </div>
                    <div className="form-group border-b border-border/50 pb-4">
                        <label className="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Estimated Fuel Cost:</label>
                        <input type="text" className="premium-input w-full bg-[#0f0f15]" placeholder="Auto-calculated..." readOnly />
                    </div>
                </div>

                <div className="mt-8">
                    <button className="premium-btn-primary w-full md:w-auto px-12 py-3">
                        <Send size={18} />
                        Confirm & Dispatch Trip
                    </button>
                    <p className="mt-4 text-xs text-muted/60 italic">
                        * Note: System will block dispatch if cargo weight exceeds vehicle capacity.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
