import DashboardLayout from "../components/DashboardLayout";
import {
    DataTable,
    ActionBar
} from "../components/DashboardComponents";
import {
    Search,
    Filter,
    ChevronDown,
    ShieldCheck
} from "lucide-react";

interface Driver {
    id: string;
    name: string;
    license: string;
    expiry: string;
    completion: string;
    safetyScore: string;
    complaints: string;
}

export default function DriverProfiles() {
    const drivers: Driver[] = [
        { id: "1", name: "John", license: "23223", expiry: "22/36", completion: "92%", safetyScore: "89%", complaints: "4" },
        { id: "2", name: "Sarah", license: "45445", expiry: "24/28", completion: "98%", safetyScore: "95%", complaints: "0" },
        { id: "3", name: "Mike", license: "67667", expiry: "21/24", completion: "85%", safetyScore: "78%", complaints: "6" },
        { id: "4", name: "Jane", license: "89889", expiry: "25/30", completion: "95%", safetyScore: "92%", complaints: "1" },
    ];

    const columns = [
        { key: "name", label: "Name" },
        { key: "license", label: "License#" },
        { key: "expiry", label: "Expiry" },
        { key: "completion", label: "Completion Rate" },
        {
            key: "safetyScore",
            label: "Saftey Score",
            render: (item: Driver) => (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} color={parseFloat(item.safetyScore) > 90 ? '#10b981' : '#f59e0b'} />
                    <span className="font-semibold">{item.safetyScore}</span>
                </div>
            )
        },
        { key: "complaints", label: "Complaints" },
    ];

    return (
        <DashboardLayout role="safety_officer">
            <ActionBar title="Driver Performance & Safety Profiles" />

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6">
                <div className="header-search flex-1 max-w-sm">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search for driver..." className="search-input" />
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
                title="Personnel Management"
                columns={columns}
                data={drivers}
            />

            <div className="mt-8 p-6 bg-secondary/30 border border-border/50 border-dashed rounded-xl">
                <p className="text-sm text-muted text-center italic">
                    "Safety Lock" Mechanism active. Drivers with expired licenses are automatically blocked from new trip assignments.
                </p>
            </div>
        </DashboardLayout>
    );
}
