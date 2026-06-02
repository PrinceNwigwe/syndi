import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay if prop provided
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    // Stop observing once visible to avoid re-animating
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before bottom
        });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={domRef}
            className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
