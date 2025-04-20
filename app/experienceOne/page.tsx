"use client"

import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from 'next/image'
gsap.registerPlugin(useGSAP)

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content?: string;
    isFullScreen?: boolean;
    children?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, content, isFullScreen = false, children }: ModalProps) => {
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

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

            if (isFullScreen) {
                tl.to(modalContent, {
                    y: "100vh",
                    duration: 0.5,
                    ease: "power3.in"
                })
                .to(overlay, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.in"
                }, "-=0.2");
            } else {
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
        }
    }, [onClose, isFullScreen]);

    useGSAP(() => {
        if (isOpen && !isClosing) {
            const modalContent = modalRef.current;
            const overlay = overlayRef.current;

            if (modalContent && overlay) {
                if (isFullScreen) {
                    gsap.set(modalContent, { y: "100vh" });
                    gsap.set(overlay, { opacity: 0 });

                    const tl = gsap.timeline();
                    tl.to(overlay, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    .to(modalContent, {
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out"
                    }, "-=0.1");
                } else {
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
        }
    }, [isOpen, isClosing, isFullScreen]);

    if (!isOpen && !isClosing) return null;

    return (
        <div 
            ref={overlayRef}
            className="modal-overlay fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={handleClose}
        >
            <div 
                ref={modalRef}
                className={`modal-content relative bg-zinc-850 ${
                    isFullScreen 
                    ? 'fixed inset-0 w-full h-full overflow-auto' 
                    : 'rounded-lg p-8 max-w-2xl w-full mx-4'
                }`}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleClose}
                    className={`absolute ${isFullScreen ? 'top-8 right-8' : 'top-4 right-4'} text-white/70 hover:text-white transition-colors`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                {isFullScreen ? (
                    <div className="p-8">
                        <h2 className="text-white text-8xl font-emberly mb-8">{title}</h2>
                        {children || (
                            <p className="text-white/70 font-emberly text-2xl leading-relaxed">{content}</p>
                        )}
                    </div>
                ) : (
                    <>
                        <h2 className="text-white text-6xl font-emberly mb-6">{title}</h2>
                        <p className="text-white/70 font-emberly text-xl leading-relaxed">{content}</p>
                    </>
                )}
            </div>
        </div>
    );
};

interface ProjectCardProps {
    title: string;
    shortDesc: string;
    longDesc: string;
}

const ProjectCard = ({ title, shortDesc, longDesc }: ProjectCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (cardRef.current) {
            if (isExpanded) {
                gsap.to(cardRef.current, {
                    backgroundColor: "rgba(9, 9, 11, 0.95)",
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(cardRef.current, {
                    backgroundColor: "rgba(9, 9, 11, 0.95)",
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }
    }, [isExpanded]);

    return (
        <div
            ref={cardRef}
            className="bg-zinc-950/95 p-8 rounded-lg cursor-pointer transition-all border border-white/10 relative overflow-hidden group"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <h3 className="text-white text-4xl font-emberly mb-4">{title}</h3>
                <p className="text-white/70 text-xl">
                    {isExpanded ? longDesc : shortDesc}
                </p>
                <p className="text-white/50 text-sm mt-4">
                    {isExpanded ? "Click to collapse ↑" : "Click to expand ↓"}
                </p>
            </div>
        </div>
    );
};

export default function Experience() {
    const router = useRouter();
    const [modalStates, setModalStates] = useState({
        about: false,
        projects: false,
        experience: false
    });

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const galleryRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!galleryRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - galleryRef.current.offsetLeft);
        setScrollLeft(galleryRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !galleryRef.current) return;
        e.preventDefault();
        const x = e.pageX - galleryRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        galleryRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const photos = [
        {
            src: "/photos/DSC_0651.jpg",
            title: "A Cool breeze",
            description: "A beautiful picture of a city at night",
            info: "Nikon D5600 | f/5.6 | 1/15 | ISO 3200"
        },
        {
            src: "/photos/DSC_0456.jpg",
            title: "A Beautiful Sunset",
            description: "A beautiful picture of a sunset in Cape Canaveral",
            info: "Nikon D5600 | f/5.6 | 1/100 | ISO 1000"
        },
        {
            src: "/photos/DSC_0205.jpg",
            title: "Solitude on a Trail",
            description: "A man stands on a rugged dirt path, gazing at the water, surrounded by lush greenery and an open sky, evoking solitude and reflection.",
            info: "Nikon D5600 | f/3.5 | 1/1000 | ISO 100"
        },
        
        
        
        // Add more photos here in the same format:
        // {
        //     src: "/photos/your-photo-name.jpg",
        //     title: "Photo Title",
        //     description: "Photo Description"
        // },
    ];

    const openModal = (modal: keyof typeof modalStates) => {
        setModalStates(prev => ({ ...prev, [modal]: true }));
    };

    const closeModal = (modal: keyof typeof modalStates) => {
        setModalStates(prev => ({ ...prev, [modal]: false }));
    };

    const handleNavigation = () => {
        const tl = gsap.timeline({
            onComplete: () => router.push('/')
        });

        // Fade out all animations
        tl.to([
            ".animation-1",
            ".animation-2",
            ".animation-3",
            ".animation-4",
            ".animation-6-1",
            ".animation-6-2",
            ".animation-6-3",
            ".animation-7-1",
            ".animation-7-2",
            ".animation-7-3",
            ".animation-8",
            ".learn-more-btn"
        ], {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set([".animation-1", ".animation-2", ".animation-3"], { opacity: 0, y: 50, scale: 1 });
        gsap.set(".animation-4", { opacity: 0, y: 50 });
        gsap.set([".animation-6-1", ".animation-6-2", ".animation-6-3"], { scaleX: 0 });
        gsap.set([".animation-7-1", ".animation-7-2", ".animation-7-3"], { opacity: 0, y: 20 });
        gsap.set(".animation-8", { opacity: 0 });
        gsap.set(".learn-more-btn", { opacity: 0, y: 10 });
        
        // Create animation sequence
        tl.to([".animation-1", ".animation-2", ".animation-3"], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        })
        .to([".animation-1", ".animation-2"], {
            opacity: 0,
            duration: 0.5,
        }, "+=1")
        .to(".animation-3", {
            x: '45vw',
            y: '30vh',
            scale: 0.5,
            duration: 1,
            ease: "power2.inOut"
        }, "<")
        .to(".animation-4", {
            opacity: 1,
            duration: 1,
            y: 0,
            ease: "power2.inOut"
        }, "+=0.5")
        .to([".animation-6-1", ".animation-6-2", ".animation-6-3"], {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.2
        })
        .to(".animation-7-1", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "+=0.2")
        .to(".animation-7-2", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "+=0.2")
        .to(".animation-7-3", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scale: 1
        }, "+=0.2")
        .to(".animation-7-3", {
            scale: 1.1,
            y: 10,
            duration: 0.3,
            ease: "power2.inOut"
        }, ">")
        .to(".animation-4", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }, "+=0.5")
        .to(".animation-3", {
            opacity: 1,
            duration: 0.5,
            x: '-45vw',
            y: '-57vh',
            scale: 0.5,
            ease: "power2.inOut"
        }, "+=0.5")
        .to(".animation-8", {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.inOut"
        }, "+=0.5")
        .to(".learn-more-btn", {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3");
    });

    return (
        <div className="relative h-screen w-screen">
            {/* Background with Circles */}
            <div className="absolute inset-0">
                <div className="absolute w-24 h-24 rounded-full bg-red-500/30 top-[10%] left-[20%] animate-pulse" />
                <div className="absolute w-32 h-32 rounded-full bg-blue-500/30 top-[30%] left-[60%] animate-pulse delay-1000" />
                <div className="absolute w-16 h-16 rounded-full bg-green-500/30 top-[50%] left-[30%] animate-pulse delay-2000" />
                <div className="absolute w-20 h-20 rounded-full bg-yellow-500/30 top-[70%] left-[80%] animate-pulse delay-3000" />
                <div className="absolute w-28 h-28 rounded-full bg-purple-500/30 top-[20%] left-[50%] animate-pulse delay-4000" />
                <div className="absolute w-24 h-24 rounded-full bg-orange-500/30 top-[60%] left-[10%] animate-pulse delay-5000" />
            </div>
            {/* Frosted Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 to-zinc-800/30 backdrop-blur-lg" />
            <div className="relative flex flex-col items-center justify-center h-full w-full z-10">
                <h1 className="text-white text-5xl sm:text-7xl md:text-9xl font-bold animation-1 font-emberly">Hi</h1>
                <h1 className="text-white text-5xl sm:text-7xl md:text-9xl font-bold animation-2 font-emberly">I&apos;m</h1>
                <div onClick={handleNavigation} className="cursor-pointer">
                    <h1 className="text-white text-5xl sm:text-7xl md:text-9xl font-bold animation-3 font-emberly">Tytan</h1>
                </div>
                <div className="animation-4 absolute z-30 bg-zinc-850 inset-[15vh] m-auto rounded-lg items-center justify-center">
                    <div className="animation-6-1 absolute z-10 border-b-2 border-white top-[30%] left-[10%] right-[10%]" > 
                        <h1 className="animation-7-1 font-emberly text-white text-bold text-4xl md:text-7xl">Welcome</h1>
                    </div>
                    <div className="animation-6-2 absolute z-10 border-b-2 border-white top-[50%] left-[10%] right-[10%]" >
                        <h1 className="animation-7-2 font-emberly text-white text-bold text-4xl md:text-7xl flex justify-center">to my</h1>
                    </div>
                    <div className="animation-6-3 absolute z-10 border-b-2 border-white top-[73%] left-[10%] right-[10%]" > 
                        <h1 className="animation-7-3 font-emberly text-white text-bold text-4xl md:text-7xl flex justify-end">portfolio</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full max-w-[1200px] h-auto md:h-[30vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="flex flex-col flex-1 border-r border-white/20 p-4 md:p-8 animation-8">
                    <h2 className="text-white text-2xl md:text-4xl font-emberly mb-4">About Me</h2>
                    <p className="text-white/70 text-base md:text-xl font-emberly">
                        Frontend developer with a passion for creating seamless user experiences
                    </p>
                    <button 
                        onClick={() => openModal('about')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly text-sm md:text-base"
                    >
                        Learn More →
                    </button>
                </div>
                <div className="flex flex-col flex-1 border-r border-white/20 p-4 md:p-8 animation-8">
                    <h2 className="text-white text-2xl md:text-4xl font-emberly mb-4">Projects</h2>
                    <p className="text-white/70 text-base md:text-xl font-emberly">
                        Explore my latest works and technical achievements
                    </p>
                    <button 
                        onClick={() => openModal('projects')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly text-sm md:text-base"
                    >
                        Learn More →
                    </button>
                </div>
                <div className="flex flex-col flex-1 p-4 md:p-8 animation-8">
                    <h2 className="text-white text-2xl md:text-4xl font-emberly mb-4">Photo Essays</h2>
                    <p className="text-white/70 text-base md:text-xl font-emberly">
                        Wasting Money
                    </p>
                    <button 
                        onClick={() => openModal('experience')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly text-sm md:text-base"
                    >
                        Learn More →
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalStates.about}
                onClose={() => closeModal('about')}
                title="About Me"
                content="I'm a passionate full-stack developer with a keen eye for detail and a love for creating intuitive user experiences. My journey in software development began with a curiosity for how things work, which has evolved into a professional pursuit of excellence in web development. I specialize in modern web technologies and believe in writing clean, maintainable code that scales."
            >
                <h2 className="text-white text-4xl md:text-6xl font-emberly mb-6">About Me</h2>
                <p className="text-white/70 font-emberly text-base md:text-xl leading-relaxed">I&apos;m a passionate full-stack developer with a keen eye for detail and a love for creating intuitive user experiences. My journey in software development began with a curiosity for how things work, which has evolved into a professional pursuit of excellence in web development. I specialize in modern web technologies and believe in writing clean, maintainable code that scales.</p>
            </Modal>

            <Modal
                isOpen={modalStates.projects}
                onClose={() => closeModal('projects')}
                title="Projects"
                isFullScreen
            >
                <div className="p-8">
                    <h2 className="text-white text-5xl md:text-8xl font-emberly mb-8">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <ProjectCard
                            title="Portfolio Website"
                            shortDesc="A modern, animated portfolio built with Next.js"
                            longDesc="A fully responsive portfolio website built using Next.js, TailwindCSS, and GSAP. Features smooth animations, modal interactions, and dynamic content loading. The design focuses on user experience with elegant transitions and intuitive navigation."
                        />
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalStates.experience}
                onClose={() => closeModal('experience')}
                title="Photography"
                isFullScreen
            >
                <div className="p-8">
                    <h2 className="text-white text-5xl md:text-8xl font-emberly mb-8">Photography</h2>
                    <div className="mt-12 relative">
                        <div 
                            ref={galleryRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            className="overflow-x-auto pb-8 hide-scrollbar select-none"
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            <div className="flex gap-8 w-max px-8">
                                {photos.map((photo, index) => (
                                    <div 
                                        key={index}
                                        className="w-[300px] md:w-[500px] flex-shrink-0 aspect-[4/3] bg-black rounded-lg overflow-hidden group relative"
                                        style={{ userSelect: 'none' }}
                                    >
                                        <Image 
                                            src={photo.src}
                                            alt={photo.title}
                                            className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                                            width={500}
                                            height={375}
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute top-4 right-4">
                                                <p className="text-white/70 text-sm font-mono">{photo.info}</p>
                                            </div>
                                            <div className="absolute bottom-0 left-0 p-6">
                                                <h4 className="text-white text-xl md:text-2xl font-emberly">{photo.title}</h4>
                                                <p className="text-white/70 text-base md:text-lg">{photo.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {Array.from({ length: Math.max(0, 4 - photos.length) }).map((_, index) => (
                                    <div 
                                        key={`placeholder-${index}`}
                                        className="w-[300px] md:w-[500px] flex-shrink-0 aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden group relative"
                                    >
                                        <div className="w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                                            <p className="text-white/50">More photos coming soon</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
