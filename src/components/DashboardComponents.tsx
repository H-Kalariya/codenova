import React from "react";
import {
    MoreVertical,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    Plus
} from "lucide-react";

// --- Stat Card ---
interface StatCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: string;
        isUp: boolean;
    };
    meta?: string;
    color: string;
    icon?: React.ElementType;
}

export const StatCard = ({ label, value, trend, meta, color, icon: Icon }: StatCardProps) => (
    <div className="premium-stat-card">
        <div className="stat-card-glow" style={{ background: color }} />
        <div className="stat-card-content">
            <div className="stat-header">
                <p className="stat-label">{label}</p>
                {Icon && (
                    <div className="stat-icon-wrapper" style={{ color }}>
                        <Icon size={20} />
                    </div>
                )}
            </div>

            <div className="stat-body">
                <h3 className="stat-value">{value}</h3>
                {trend && (
                    <div className={`stat-trend ${trend.isUp ? "up" : "down"}`}>
                        {trend.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>

            {(meta || trend) && (
                <div className="stat-footer">
                    <p className="stat-meta">{meta || "vs last period"}</p>
                </div>
            )}
        </div>
    </div>
);

// --- Data Table ---
interface TableColumn {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    title: string;
    columns: TableColumn[];
    data: any[];
    actions?: React.ReactNode;
}

export const DataTable = ({ title, columns, data, actions }: DataTableProps) => (
    <div className="premium-card overflow-hidden">
        <div className="card-header border-b">
            <div className="flex items-center justify-between gap-4">
                <h3 className="card-title">{title}</h3>
                <div className="flex items-center gap-3">
                    {actions}
                    <button className="icon-btn-secondary">
                        <Filter size={18} />
                    </button>
                    <button className="icon-btn-secondary">
                        <Download size={18} />
                    </button>
                    <button className="icon-btn-secondary">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="premium-table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx}>
                            {columns.map(col => (
                                <td key={col.key}>
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}
                            <td className="text-right">
                                <button className="table-action-btn">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Status Badge ---
interface StatusBadgeProps {
    status: string;
    type?: "success" | "warning" | "error" | "info" | "neutral";
}

export const StatusBadge = ({ status, type = "neutral" }: StatusBadgeProps) => (
    <span className={`premium-badge badge-${type}`}>
        <span className="badge-dot" />
        {status}
    </span>
);

// --- Action Bar ---
export const ActionBar = ({ children, title }: { children?: React.ReactNode, title: string }) => (
    <div className="action-bar-container">
        <div className="action-bar-left">
            <h1 className="page-title">{title}</h1>
        </div>
        <div className="action-bar-right">
            {children}
        </div>
    </div>
);

// --- New Button ---
export const PrimaryButton = ({ label, icon: Icon, onClick }: { label: string, icon?: React.ElementType, onClick?: () => void }) => (
    <button className="premium-btn-primary" onClick={onClick}>
        {Icon && <Icon size={18} />}
        {label}
    </button>
);
