import React from 'react';
import './Spinner.css';

interface LoaderProps {
    size?: number;
    borderWidth?: number;
    color?: string;
    backgroundColor?: string;
    className?: string;
}

const Spinner: React.FC<LoaderProps> = ({
    size = 120,
    borderWidth = 16,
    color = '#3498db',
    backgroundColor = '#f3f3f3',
    className = '',
}) => {
    const loaderStyle = {
        border: `${borderWidth}px solid ${backgroundColor}`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
        animation: 'spin 2s linear infinite',
    };

    return <div className={`loader ${className}`} style={loaderStyle} />;
};

export default Spinner;