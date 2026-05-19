import { useState } from 'react';

function NavigationBar({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 p-4 sticky top-0 z-50 shadow-sm animate-fade-in-up">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-end md:justify-center">
                <button
                    className="md:hidden text-emerald-800 p-2 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
                <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto gap-4 items-center justify-center mt-4 md:mt-0`}>
                    {children}
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar
