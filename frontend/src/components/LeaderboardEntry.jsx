function LeaderboardEntry({ rank, name, email }) {
    // Top 3 colors
    const isTop3 = rank <= 3;
    const bgClass = rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-amber-100 border-amber-200 text-amber-900' :
                    rank === 2 ? 'bg-gradient-to-r from-slate-50 to-slate-200 border-slate-300 text-slate-800' :
                    rank === 3 ? 'bg-gradient-to-r from-orange-50 to-orange-200 border-orange-300 text-orange-900' :
                    'bg-white/60 border-emerald-100 hover:border-emerald-200 text-emerald-900';
                    
    // Mock score based on rank
    const mockScore = Math.max(1000, 10000 - (rank * 500));

    return (
        <div className={`flex justify-between items-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${bgClass}`}>
            <div className="flex items-center gap-4 sm:gap-6">
                <span className={`text-xl sm:text-2xl font-bold w-8 text-center ${isTop3 ? '' : 'opacity-50'}`}>
                    #{rank}
                </span>
                <div>
                    <div className="font-semibold text-sm sm:text-base">{name || 'UNKNOWN PLAYER'}</div>
                    <div className="text-xs opacity-70 truncate max-w-[100px] sm:max-w-xs">{email}</div>
                </div>
            </div>
            <div className="font-semibold text-lg sm:text-xl text-right">
                {mockScore.toLocaleString()} <span className="text-xs sm:text-sm font-medium opacity-70">PTS</span>
            </div>
        </div>
    )
}

export default LeaderboardEntry
