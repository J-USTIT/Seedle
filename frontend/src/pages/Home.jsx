import LinkButton from "../components/LinkButton";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-6 font-sans">

            <div className="w-full max-w-4xl bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-10 sm:p-16 relative overflow-hidden animate-fade-in-up text-center">

                {/* Decor na leaf-like blobs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/40 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 drop-shadow-sm">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </svg>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 tracking-tight mb-6 p-0">
                        Welcome to Seedle
                    </h1>

                    <p className="text-lg text-emerald-700/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Test your botanical knowledge! Guess the plant of the day, explore the dictionary, and climb the leaderboards.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <LinkButton to="/daily" className="!px-8 !py-3.5 text-lg shadow-md hover:shadow-lg">
                            Play Daily Game
                        </LinkButton>
                        <LinkButton to="/leaderboard" className="!px-8 !py-3.5 text-lg shadow-md hover:shadow-lg">
                            View Leaderboards
                        </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
