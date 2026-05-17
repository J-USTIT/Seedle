function NavigationBar({children}) {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 p-4 sticky top-0 z-50 shadow-sm animate-fade-in-up">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-center">
                {children}
            </div>
        </nav>
    )
}

export default NavigationBar
