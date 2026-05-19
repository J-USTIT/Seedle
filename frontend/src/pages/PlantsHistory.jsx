import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import useFetch from "../hooks/useFetch.js";
import EditPlantHistoryModal from "../components/PlantHistoryModals/EditPlantHistoryModal.jsx";

function PlantsHistory() {
    const [showPast, setShowPast] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [round, setRound] = useState(null);
    const [globalFilter, setGlobalFilter] = useState("");

    const [allRounds, refetchAllRounds] = useFetch("/rounds");
    const [sevenRounds, refetchSevenRounds] = useFetch("/7rounds");

    const editPlantHistoryModal = (round) => {
        setIsEditOpen((prev) => !prev);
        setRound(round);
    };

    const toggleShow = () => {
        setShowPast((prev) => !prev);
        setGlobalFilter("");
    };

    const columns = useMemo(() => [
        {
            accessorKey: "playDate",
            header: "Play Date",
            cell: ({ getValue }) => (
                <span className="font-medium text-emerald-700">
                    {new Date(getValue()).toLocaleDateString()}
                </span>
            ),
        },
        {
            accessorKey: "plantCommonName",
            header: "Plant Name",
            cell: ({ getValue }) => (
                <span className="font-bold text-emerald-900">{getValue()}</span>
            ),
        },
        {
            id: "actions",
            header: () => <span className="block text-right">Action</span>,
            cell: ({ row }) => (
                <div className="text-right">
                    <button
                        onClick={() => editPlantHistoryModal(row.original)}
                        className="px-4 py-1.5 rounded-full bg-white text-emerald-700 text-xs font-bold border border-emerald-100 hover:bg-emerald-50 transition-colors"
                    >
                        Edit
                    </button>
                </div>
            ),
        },
    ], []);

    const tableData = useMemo(() => {
        const source = showPast ? allRounds : sevenRounds;
        return source ?? [];
    }, [showPast, allRounds, sevenRounds]);

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
            <div className="w-full max-w-[1000px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900 tracking-tight">
                            Plants History
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
                        <input
                            type="text"
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search by plant name..."
                            className="w-full md:w-64 px-4 py-2.5 rounded-xl border border-emerald-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800"
                        />

                        <button
                            onClick={toggleShow}
                            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-[#DAFAF1] text-[#003E33] font-bold shadow-sm hover:bg-[#159E5E] hover:text-white transition-all duration-200"
                        >
                            {showPast ? "Show Next 7 Days" : "Show All Rounds"}
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto rounded-2xl border border-emerald-50/50 shadow-sm bg-white/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id}
                                        className="bg-white/60 text-emerald-800 text-xs uppercase tracking-wider font-semibold border-b border-emerald-100/50"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-4">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="text-emerald-800 text-sm">
                                {tableData.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-12 text-emerald-600/50">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-12 text-emerald-600/50">
                                            No results found.
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className="px-6 py-4">
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
                            <strong>{table.getPageCount() || 1}</strong> &mdash;{" "}
                            {table.getFilteredRowModel().rows.length} result(s)
                        </span>

                        <div className="flex items-center gap-2">
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                className="px-3 py-1.5 rounded-full border border-emerald-200 bg-white/60 text-emerald-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            >
                                {[5, 10, 20].map((size) => (
                                    <option key={size} value={size}>Show {size}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >«</button>
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >‹</button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >›</button>
                            <button
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1.5 rounded-full bg-white/60 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >»</button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditOpen && (
                <EditPlantHistoryModal
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    round={round}
                    refetchAllRounds={refetchAllRounds}
                    refetchSevenRounds={refetchSevenRounds}
                />
            )}
        </div>
    );
}

export default PlantsHistory;