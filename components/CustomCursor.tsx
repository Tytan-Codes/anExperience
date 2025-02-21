"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorOuterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorOuter = cursorOuterRef.current;

        if (!cursor || !cursorOuter) return;

        // Initial position off screen
        gsap.set([cursor, cursorOuter], {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
        });

        // Show cursor when it enters the viewport
        gsap.to([cursor, cursorOuter], {
            opacity: 1,
            duration: 0.4,
            delay: 0.2,
        });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
        const xToOuter = gsap.quickTo(cursorOuter, "x", { duration: 0.5, ease: "power3" });
        const yToOuter = gsap.quickTo(cursorOuter, "y", { duration: 0.5, ease: "power3" });

        const mouseMoveHandler = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToOuter(e.clientX);
            yToOuter(e.clientY);
        };

        // Function to handle hover effects
        const handleHoverEffects = () => {
            const hoverElements = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]');
            
            const onMouseEnter = () => {
                gsap.to(cursor, {
                    scale: 0.5,
                    duration: 0.3,
                });
                gsap.to(cursorOuter, {
                    scale: 2,
                    duration: 0.5,
                });
            };

            const onMouseLeave = () => {
                gsap.to([cursor, cursorOuter], {
                    scale: 1,
                    duration: 0.3,
                });
            };

            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', onMouseEnter);
                element.addEventListener('mouseleave', onMouseLeave);
            });

            return { hoverElements, onMouseEnter, onMouseLeave };
        };

        // Initial hover effect setup
        const { hoverElements, onMouseEnter, onMouseLeave } = handleHoverEffects();

        // Create a MutationObserver to watch for DOM changes
        const observer = new MutationObserver(() => {
            // Remove old event listeners
            hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', onMouseEnter);
                element.removeEventListener('mouseleave', onMouseLeave);
            });
            
            // Setup new event listeners
            handleHoverEffects();
        });

        // Start observing the document body for DOM changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        window.addEventListener('mousemove', mouseMoveHandler);
        
        // Hide cursor when it leaves the viewport
        const mouseLeaveHandler = () => {
            gsap.to([cursor, cursorOuter], {
                opacity: 0,
                duration: 0.2,
            });
        };

        const mouseEnterHandler = () => {
            gsap.to([cursor, cursorOuter], {
                opacity: 1,
                duration: 0.2,
            });
        };

        document.body.addEventListener('mouseleave', mouseLeaveHandler);
        document.body.addEventListener('mouseenter', mouseEnterHandler);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            document.body.removeEventListener('mouseleave', mouseLeaveHandler);
            document.body.removeEventListener('mouseenter', mouseEnterHandler);
            observer.disconnect();
            hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', onMouseEnter);
                element.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div 
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] w-4 h-4 rounded-full border-2 border-white mix-blend-difference"
            />
            <div 
                ref={cursorOuterRef}
                className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-white mix-blend-difference"
            />
        </>
    );
} 