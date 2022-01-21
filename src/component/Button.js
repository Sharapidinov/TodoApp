import React from 'react';

const Button = ({color = "gray" , className, text, onClick}) => {
    return (

        <button
            onClick={onClick}
            className={`px-5 py-1 rounded mx-1 ${className}`}
            type="button"
        >
            {text}
        </button>

    );
};

export default Button;