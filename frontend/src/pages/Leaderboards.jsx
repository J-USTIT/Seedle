import LeaderboardEntry from "../components/LeaderboardEntry";
import LinkButton from "../components/LinkButton";
import useFetch from "../hooks/useFetch.js"

function Leaderboards() {

    // CHANGE THIS TO RETRIEVING USERCOLLECTION DATA INSTEAD
    const [localScoreData] = useFetch("/localleaderboard");

    console.log(localScoreData);
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-6 font-sans">

            <div className="w-full max-w-3xl bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden animate-fade-in-up mt-8">

                {/* Same leaf-like blobs */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-green-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-semibold text-emerald-900 tracking-tight mb-2">
                            Leaderboard
                        </h1>
                        <p className="text-emerald-700/70 text-sm font-medium">Top Seeders</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Header Row */}
                        <div className="flex justify-between items-center px-6 py-3 bg-white/50 rounded-2xl text-emerald-800 font-semibold text-sm md:text-base border border-emerald-100/50 shadow-sm">
                            <span>Rank / Player</span>
                            <span>Score</span>
                        </div>

                        {localScoreData?.data && localScoreData.data.length > 0 ? localScoreData?.data.map(({ user }, index) =>
                            user ? <LeaderboardEntry key={user._id} rank={index + 1} name={user.username}
                            //  email={user.email} 
                         /> : null
                        ) : (
                            <div className="text-center text-emerald-600/50 py-12 animate-pulse font-medium text-lg">
                                LOADING DATA...
                            </div>
                        )}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <LinkButton to="/daily"> Back to Game </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboards
