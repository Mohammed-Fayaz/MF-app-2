import React from 'react';

const Button: React.FC<{ text?: string }> = ({ text }) => {
    return (
        <button
            style={{ backgroundColor: 'blue', color: 'white', padding: '5px' }}
            onClick={() => alert('Clicked')}
        >
            {text ?? 'Click me!'}
        </button>
    );
};

export default React.memo(Button);
