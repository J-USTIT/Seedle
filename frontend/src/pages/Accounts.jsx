import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import useFetch from "../hooks/useFetch";
import EditAccountModal from "../components/AccountModals/EditAccountModal.jsx";
import AddAccountModal from "../components/AccountModals/AddAccountModal.jsx";
import ArchiveAccountModal from "../components/AccountModals/ArchiveAccountModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Accounts() {
    const { user: currentUser } = useAuth();
    const [data, refetch] = useFetch("/users");
    const [editForm, setEditForm] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [archiveUser, setArchiveUser] = useState(null);
    const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");

    const onEditEvent = (user) => {
        setEditForm(user);
        setIsEditOpen((prev) => !prev);
    };

    const onAddEvent = () => {
        setIsAddOpen((prev) => !prev);
    };

    const onArchiveEvent = (user) => {
        setArchiveUser(user);
        setIsArchiveConfirmOpen((prev) => !prev);
    };

    const columns = useMemo(() => [
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ getValue }) => (
                <span className="font-medium">{getValue()}</span>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ getValue }) => (
                <span className="text-emerald-700/80">{getValue()}</span>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ getValue }) => {
                const role = getValue();
                return (
                    <span className="font-medium">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                );
            },
        },
        {
            accessorKey: "isArchived",
            header: "Status",
            cell: ({ getValue }) => {
                const isArchived = getValue();
                return (
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isArchived
                                ? "bg-rose-100 text-rose-800"
                                : "bg-emerald-100 text-emerald-800"
                        }`}
                    >
                        {isArchived ? "Archived" : "Active"}
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) => (
                <span className="text-emerald-700/80">
                    {new Date(getValue()).toLocaleString()}
                </span>
            ),
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ getValue }) => (
                <span className="text-emerald-700/80">
                    {new Date(getValue()).toLocaleString()}
                </span>
            ),
        },
        {
            id: "actions",
            header: () => <span className="block text-center">Action</span>,
            cell: ({ row }) => {
                const user = row.original;
                const isSelf = user._id === currentUser?.userId;
                return (
                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={() => onEditEvent(user)}
                            disabled={isSelf}
                            title={isSelf ? "You cannot edit your own account." : ""}
                            className="px-4 py-1.5 rounded-full bg-[#DAFAF1] text-[#003E33] text-xs font-bold hover:bg-[#159E5E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onArchiveEvent(user)}
                            disabled={user.isArchived || isSelf}
                            title={isSelf ? "You cannot archive your own account." : ""}
                            className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Archive
                        </button>
                    </div>
                );
            },
        },
    ], [currentUser]);

    const tableData = useMemo(() => data?.userData ?? [], [data]);

    const table = useReactTable({
        data: tableData,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div className="flex flex-col items-center p-4 sm:p-6">
            <div className="w-full max-w-[1200px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/30 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }}></div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900 tracking-tight">
                            Accounts
                        </h1>
                    </div>

                    {/* Search / Filter */}
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <input
                            type="text"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search by username, email, role..."
                            className="w-full md:w-96 px-4 py-2.5 rounded-xl border border-emerald-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800"
                        />
                        <button
                            onClick={onAddEvent}
                            className="px-6 py-2.5 rounded-full bg-[#159E5E] text-white font-bold shadow-sm hover:bg-[#0f7a48] transition-all duration-200 whitespace-nowrap"
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-2xl border border-emerald-50/50 shadow-sm bg-white/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id}
                                        className="bg-white/60 text-emerald-800 text-xs uppercase tracking-wider font-semibold border-b border-emerald-100/50"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-5 py-4">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="text-emerald-800 text-sm">
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center py-10 text-emerald-500">
                                            No accounts found.
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-5 py-3">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3 text-sm text-emerald-800">
                        <span>
                            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
                            <strong>{table.getPageCount()}</strong> &mdash;{" "}
                            {table.getFilteredRowModel().rows.length} result(s)
                        </span>

                        <div className="flex items-center gap-2">
                            {/* Page size */}
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="px-3 py-1.5 rounded-full border border-emerald-200 bg-white/60 text-emerald-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            >
                                {[5, 10, 20, 50].map((size) => (
                                    <option key={size} value={size}>
                                        Show {size}
                                    </option>
                                ))}
                            </select>

                            {/* Nav buttons */}
                            <button
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                «
                            </button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                ›
                            </button>
                            <button
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditOpen && <EditAccountModal setIsEditOpen={setIsEditOpen} form={editForm} setForm={setEditForm} refetch={refetch} />}
            {isAddOpen && <AddAccountModal setIsAddOpen={setIsAddOpen} refetch={refetch} />}
            <ArchiveAccountModal isArchiveConfirmOpen={isArchiveConfirmOpen} setIsArchiveConfirmOpen={setIsArchiveConfirmOpen} user={archiveUser} refetch={refetch} />
        </div>
    );
}

export default Accounts;