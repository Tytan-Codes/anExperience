"use client"

import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import { useState, useCallback, useRef } from "react"

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
            className="modal-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
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

export default function Experience() {
    const [modalStates, setModalStates] = useState({
        about: false,
        projects: false,
        experience: false
    });

    const openModal = (modal: keyof typeof modalStates) => {
        setModalStates(prev => ({ ...prev, [modal]: true }));
    };

    const closeModal = (modal: keyof typeof modalStates) => {
        setModalStates(prev => ({ ...prev, [modal]: false }));
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
            x: '40vw',
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
        }, "+=1")
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
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-800 h-full w-full" /> 
            <div className="relative flex flex-col items-center justify-center h-full w-full z-10">
                <h1 className="text-white text-9xl font-bold animation-1 font-emberly">Hi</h1>
                <h1 className="text-white text-9xl font-bold animation-2 font-emberly">I&apos;m</h1>
                <h1 className="text-white text-9xl font-bold animation-3 font-emberly">Tytan</h1>
                <div className="animation-4 absolute z-30 bg-zinc-850 inset-[15vh] m-auto rounded-lg">
                    <div className="animation-6-1 absolute z-10 border-b-2 border-white top-[30%] left-[10%] right-[10%]" />
                    <div className="animation-6-2 absolute z-10 border-b-2 border-white top-[50%] left-[10%] right-[10%]" />
                    <div className="animation-6-3 absolute z-10 border-b-2 border-white top-[73%] left-[10%] right-[10%]" />
                    
                    <h1 className="animation-7-1 absolute z-20 top-[20%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl">Welcome</h1>
                    <h1 className="animation-7-2 absolute z-20 top-[40%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl flex justify-center">to my</h1>
                    <h1 className="animation-7-3 absolute z-20 top-[60%] left-[10%] right-[10%] font-emberly text-white text-bold text-7xl flex justify-end">portfolio</h1>
                </div>
            </div>
            <div className="flex flex-row w-full max-w-[1200px] h-[30vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="flex flex-col flex-1 border-r border-white/20 p-8 animation-8">
                    <h2 className="text-white text-4xl font-emberly mb-4">About Me</h2>
                    <p className="text-white/70 font-emberly">
                        Frontend developer with a passion for creating seamless user experiences
                    </p>
                    <button 
                        onClick={() => openModal('about')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly"
                    >
                        Learn More →
                    </button>
                </div>
                <div className="flex flex-col flex-1 border-r border-white/20 p-8 animation-8">
                    <h2 className="text-white text-4xl font-emberly mb-4">Projects</h2>
                    <p className="text-white/70 font-emberly">
                        Explore my latest works and technical achievements
                    </p>
                    <button 
                        onClick={() => openModal('projects')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly"
                    >
                        Learn More →
                    </button>
                </div>
                <div className="flex flex-col flex-1 p-8 animation-8">
                    <h2 className="text-white text-4xl font-emberly mb-4">Photography</h2>
                    <p className="text-white/70 font-emberly">
                        Wasting Money
                    </p>
                    <button 
                        onClick={() => openModal('experience')}
                        className="learn-more-btn self-end mt-auto text-white/70 hover:text-white transition-colors font-emberly"
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
            />

            <Modal
                isOpen={modalStates.projects}
                onClose={() => closeModal('projects')}
                title="Projects"
                isFullScreen
            >
                <div className="grid grid-cols-2 gap-8 mt-12">
                    <div className="bg-zinc-900/50 p-8 rounded-lg">
                        <h3 className="text-white text-4xl font-emberly mb-4">Project 1</h3>
                        <p className="text-white/70 text-xl">Description of project 1</p>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-lg">
                        <h3 className="text-white text-4xl font-emberly mb-4">Project 2</h3>
                        <p className="text-white/70 text-xl">Description of project 2</p>
                    </div>
                    {/* Add more project cards as needed */}
                </div>
            </Modal>

            <Modal
                isOpen={modalStates.experience}
                onClose={() => closeModal('experience')}
                title="Photography"
                isFullScreen
            >
                <div className="grid grid-cols-3 gap-8 mt-12">
                    <div className="bg-zinc-900/50 p-8 rounded-lg aspect-square">
                        <div className="w-full h-full bg-zinc-800 rounded-lg"></div>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-lg aspect-square">
                        <div className="w-full h-full bg-zinc-800 rounded-lg"></div>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-lg aspect-square">
                        <div className="w-full h-full bg-zinc-800 rounded-lg"></div>
                    </div>
                    {/* Add more photo placeholders as needed */}
                </div>
            </Modal>
        </div>
    );
}
