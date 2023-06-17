import { useState, useEffect } from 'react';

//Wahrscheinlich nicht benötigt ;D
export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<{
        x: null | number;
        y: null | number;
    }>({ x: null, y: null });
    useEffect(() => {
        const updateMousePosition = (ev: {
            clientX: number;
            clientY: number;
        }) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
