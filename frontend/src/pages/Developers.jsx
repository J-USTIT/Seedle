import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import LinkButton from '../components/LinkButton.jsx';
import DeveloperModal from '../components/DeveloperModal.jsx';

function Developers() {
    const [developers] = useFetch('/developers');
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (developer) => {
        setSelectedDeveloper(developer);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeveloper(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-6 font-sans">
            <div className="w-full max-w-5xl">                
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 tracking-tight mb-3">
                        Our Developers
                    </h1>
                </div>                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {developers?.data ? (
                        developers.data.map((developer) => (
                            <div
                                key={developer._id}
                                onClick={() => handleCardClick(developer)}
                                className="group cursor-pointer"
                            >
                                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">                                    
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>                            
                                    <div className="aspect-square bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden flex items-center justify-center p-4">
                                        <img
                                            src={`http://localhost:8000/${developer.photoPath}`}
                                            alt={developer.name}
                                            className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>                                    
                                    <div className="p-6 text-center">
                                        <h3 className="text-2xl font-bold text-emerald-900 mb-1">
                                            {developer.name}
                                        </h3>
                                        <p className="text-emerald-600 font-semibold mb-2">
                                            {developer.role}
                                        </p>
                                        <p className="text-emerald-700/70 text-sm line-clamp-2">
                                            {developer.bio}
                                        </p>
                                    </div>                                    
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none rounded-3xl"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-emerald-600/50 py-20 animate-pulse font-medium text-lg">
                            LOADING DEVELOPERS...
                        </div>
                    )}
                </div>                
                <div className="flex justify-center">
                    <LinkButton to="/admin">Back to Admin</LinkButton>
                </div>
            </div>            
            <DeveloperModal 
                developer={selectedDeveloper}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default Developers;
