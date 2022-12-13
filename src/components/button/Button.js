import React from 'react';
import "./Button.css"


function Button({children, clickHandler, disabled }) {
    return (
            <button
                type="button"
                className="nav-button"
                onClick={clickHandler}
                disabled={disabled}
            >
            {children}
        </button>
    );
}

export default Button;