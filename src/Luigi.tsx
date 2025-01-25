import { useState, useEffect } from 'react';

const Luigi = () => {
    const [isFirstImage, setIsFirstImage] = useState(true);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                setIsFirstImage(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <img
                src={isFirstImage ?
                    '/luigi.png' :
                    '/luigi_talk.png'}
                alt="Switchable content"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.5s ease',
                }}
            />
        </div>
    );
};

export default Luigi