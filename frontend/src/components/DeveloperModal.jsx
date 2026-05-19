import { useState } from 'react';

function DeveloperModal({ developer, isOpen, onClose }) {
    if (!isOpen || !developer) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in-up">                
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500"></div>                
                <div className="p-8 text-center">
                    <div className="mb-6">
                        <img 
                            src={`http://localhost:8000/${developer.photoPath}`}
                            alt={developer.name}
                            className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-emerald-100 shadow-lg"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-emerald-900 mb-2">
                        {developer.name}
                    </h2>

                    <p className="text-lg font-semibold text-emerald-600 mb-4">
                        {developer.role}
                    </p>

                    <p className="text-emerald-700/80 leading-relaxed mb-6">
                        {developer.bio}
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeveloperModal;
