import React from 'react';

const Button = ({color = "gray", text, onClick}) => {
    return (

        <button
            onClick={onClick}
            className={`bg-${color}-500 px-5 py-1 rounded mx-1`}
            type="button"
        >
            {text}
        </button>

    );
};

export default Button;