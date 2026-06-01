function LeaderboardEntry({ rank, name, email }) {
    // Top 3 colors
    const isTop3 = rank <= 3;
    const bgClass = rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-amber-100 border-amber-200 text-amber-900' :
                    rank === 2 ? 'bg-gradient-to-r from-slate-50 to-slate-200 border-slate-300 text-slate-800' :
                    rank === 3 ? 'bg-gradient-to-r from-orange-50 to-orange-200 border-orange-300 text-orange-900' :
                    'bg-white/80 border-emerald-100 hover:border-emerald-200 text-emerald-900';
                    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

    // Mock score based on rank
    const mockScore = Math.max(1000, 10000 - (rank * 500));

    return (
        <div className={`flex justify-between items-center p-4 rounded-xl border-2 border-b-[4px] transition-all duration-150 hover:-translate-y-1 hover:border-b-[6px] active:translate-y-[2px] active:border-b-2 ${bgClass}`}>
            <div className="flex items-center gap-4 sm:gap-6">
                <span className={`text-xl sm:text-2xl font-bold w-10 sm:w-12 text-center font-mono tracking-tighter ${isTop3 ? '' : 'opacity-50 text-emerald-700/60'}`}>
                    #{rank}
                </span>
                <div>
                    <div className="font-bold text-sm sm:text-base uppercase tracking-wide flex items-center gap-2">
                        {name || 'UNKNOWN PLAYER'}
                        {medal && <span className="text-lg drop-shadow-md animate-pulse">{medal}</span>}
                    </div>
                    <div className="text-xs opacity-70 truncate max-w-[100px] sm:max-w-xs">{email}</div>
                </div>
            </div>
            <div className="font-bold text-lg sm:text-xl text-right font-mono tracking-tight">
                {mockScore.toLocaleString()} <span className="text-xs sm:text-sm font-medium opacity-70">PTS</span>
            </div>
        </div>
    )
}

export default LeaderboardEntry
