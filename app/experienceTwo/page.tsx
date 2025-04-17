"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useState, useRef, useCallback } from "react"
import Image from 'next/image'

gsap.registerPlugin(useGSAP)

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        const modalContent = modalRef.current;
        const overlay = overlayRef.current;

        if (modalContent && overlay) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsClosing(false);
                    onClose();
                }
            });

            tl.to(modalContent, {
                opacity: 0,
                scale: 0.8,
                y: -20,
                duration: 0.3,
                ease: "power3.in"
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
            }, "-=0.2");
        }
    }, [onClose]);

    useGSAP(() => {
        if (isOpen && !isClosing) {
            const modalContent = modalRef.current;
            const overlay = overlayRef.current;

            if (modalContent && overlay) {
                gsap.set(modalContent, { opacity: 0, scale: 0.8, y: 20 });
                gsap.set(overlay, { opacity: 0 });

                const tl = gsap.timeline();
                tl.to(overlay, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                })
                .to(modalContent, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out"
                }, "-=0.1");
            }
        }
    }, [isOpen, isClosing]);

    if (!isOpen && !isClosing) return null;

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className="bg-zinc-900 rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/70 hover:text-white transition-colors"
                >
                    <div className="w-5 h-5 sm:w-6 sm:h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </button>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-emberly mb-4 sm:mb-6">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default function ExperienceTwo() {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<{src: string, title: string, description: string, info: string} | null>(null);

    useGSAP(() => {
        // Initial setup
        gsap.set(".animation-1", {
            opacity: 0,
            y: 50,
        })
        gsap.set(".card", {
            opacity: 0,
            y: 100,
        })

        const tl = gsap.timeline()
        
        // Title animation
        tl.to(".animation-1", {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            y: 0,
        })
        // Card animations in sequence
        .to(".card", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
        })
    })

    const zealandPhotos= [
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0153.jpeg",
            title: "Honey on a mountain",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0156.jpeg",
            title: "mountain",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0184.jpeg",
            title: "scienic drive",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0203.jpeg",
            title: "bread",
            description: "",
            info: "Nikon D5600  "
        },  
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0207.jpeg",
            title: "currious chicken ",
            description: "",
            info: "Nikon D5600  "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/IMG_0224.jpeg",
            title: "Big Head Cow",
            description: "",
            info: "Nikon D5600 "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0239.JPG",
            title: "Very nice view",
            description: "",
            info: "Nikon D5600  "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0249.JPG",
            title: "My elivation",
            description: "",
            info: "Nikon D5600 | "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0255.JPG",
            title: "Very nice view",
            description: "",
            info: "Nikon D5600 "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0265.JPG",
            title: "Very nice view",
            description: "",
            info: "Nikon D5600 "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0268.JPG",
            title: "Very nice view",
            description: "",
            info: "Nikon D5600  "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0356.JPG",
            title: "waterfall",
            description: "",
            info: "Nikon D5600 "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0365.JPG",
            title: "fall",
            description: "",
            info: "Nikon D5600  "
        }, 
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0446.JPG",
            title: "cool chicken",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0675.JPG",
            title: "car",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0669.JPG",
            title: "more car",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0663.JPG",
            title: "fern",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0665.JPG",
            title: "dad",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0665.JPG",
            title: "GROK",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0650.JPG",
            title: "fall",
            description: "",
            info: "Nikon D5600 "
        },        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0645.JPG",
            title: "Me",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0633.JPG",
            title: "view",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0631.JPG",
            title: "view",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0630.JPG",
            title: "fall",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/zealand/DSC_0627.JPG",
            title: "fall",
            description: "",
            info: "Nikon D5600 "
        },
    ]
    const vegasPhotos = [
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0055.JPG",
            title: "My Favorite Photo",
            description: "Its a sign",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0005.JPG",
            title: "Injury",
            description: "Its an injury",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0013.JPG",
            title: "Cool thing",
            description: "Its a cool thing",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0015.JPG",
            title: "MGM",
            description: "MGM is a casino",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0021.JPG",
            title: "Las Vegas Sign",
            description: "",
            info: "Nikon D5600  "
        },  
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0092.JPG",
            title: "Gambler",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0039.JPG",
            title: "Walking Man",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0050.JPG",
            title: "Strat",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0062.JPG",
            title: "Idk what to name",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0064.JPG",
            title: "Idk what to name",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0068.JPG",
            title: "Idk what to name",
            description: "",
            info: "Nikon D5600 "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0074.JPG",
            title: "Idk what to name",
            description: "",
            info: "Nikon D5600  "
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/vegas/DSC_0082.JPG",
            title: "Idk what to name",
            description: "",
            info: "Nikon D5600  "
        } 
    
    ]

    const floridaPhotos = [
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/DSC_0651.jpg",
            title: "A Cool breeze",
            description: "A beautiful picture of a city at night",
            info: "Nikon D5600 | f/5.6 | 1/15 | ISO 3200"
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/DSC_0456.jpg",
            title: "A Beautiful Sunset",
            description: "A beautiful picture of a sunset in Cape Canaveral",
            info: "Nikon D5600 | f/5.6 | 1/100 | ISO 1000"
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/DSC_0205.jpg",
            title: "Solitude on a Trail",
            description: "A man stands on a rugged dirt path, gazing at the water, surrounded by lush greenery and an open sky, evoking solitude and reflection.",
            info: "Nikon D5600 | f/5.6 | 1/125 | ISO 100"
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/DSC_0414.JPG",
            title: "Launch Day",
            description: "A picture of the launch of the Space X rocket",
            info: "Nikon D5600 | f/5.6 | 1/4000 | ISO 100"
        },
        {
            src: "https://raw.githubusercontent.com/Tytan-Codes/anExperience/main/public/photos/DSC_0213.JPG",
            title: "Very scary alligators",
            description: "A picture of a very scary alligator",
            info: "Nikon D5600 | f/5.6 | 1/2500 | ISO 100"
        }
    ];

    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen">
            <div className="flex flex-col items-center justify-center h-[20vh]">
                <div className="animation-1 p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold text-white font-manuscribe pb-2 text-center">Photo Essays</h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center py-8">
                <div className="flex flex-row justify-center items-center gap-4 sm:gap-8 px-4 sm:px-8">
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('florida')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider">Space X Launch</h2>
                    </div>
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('vegas')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider p-3">Around the world in 1 state</h2>
                    </div>
                </div>
                <div className="mt-4 sm:mt-8">
                    <div 
                        className="card w-40 sm:w-64 h-72 bg-zinc-900 rounded-lg flex items-center justify-center hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedCard('newzealand')}
                    >
                        <h2 className="text-2xl sm:text-3xl font-light text-white font-emberly tracking-wider">New Zealand</h2>
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={selectedCard === 'florida'} 
                onClose={() => setSelectedCard(null)}
                title="Space X Launch"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {floridaPhotos.map((photo, index) => (
                        <div 
                            key={index} 
                            className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                <h3 className="text-white text-lg sm:text-xl font-emberly">{photo.title}</h3>
                                <p className="text-white/80 text-xs sm:text-sm">{photo.description}</p>
                                <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2">{photo.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'vegas'} 
                onClose={() => setSelectedCard(null)}
                title="Around the world in 1 city"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {vegasPhotos.map((photo, index) => (
                        <div 
                            key={index} 
                            className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                <h3 className="text-white text-lg sm:text-xl font-emberly">{photo.title}</h3>
                                <p className="text-white/80 text-xs sm:text-sm">{photo.description}</p>
                                <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2">{photo.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal 
                isOpen={selectedCard === 'newzealand'} 
                onClose={() => setSelectedCard(null)}
                title="New Zealand"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {zealandPhotos.map((photo, index) => (
                        <div 
                            key={index} 
                            className="relative aspect-[3/2] rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                                <h3 className="text-white text-lg sm:text-xl font-emberly">{photo.title}</h3>
                                <p className="text-white/80 text-xs sm:text-sm">{photo.description}</p>
                                <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2">{photo.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal 
                isOpen={selectedPhoto !== null} 
                onClose={() => setSelectedPhoto(null)}
                title={selectedPhoto?.title || ""}
            >
                <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
                    {selectedPhoto && (
                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.title}
                            fill
                            className="object-contain rounded-lg"
                        />
                    )}
                </div>
                <div className="mt-4 text-white/80">
                    <p className="text-base sm:text-lg">{selectedPhoto?.description}</p>
                    <p className="text-sm sm:text-base mt-2 text-white/60">{selectedPhoto?.info}</p>
                </div>
            </Modal>
        </div>
    )
}

