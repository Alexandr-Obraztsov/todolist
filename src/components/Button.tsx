import React from 'react';

type ButtonPropsType = {
    title: string,
    callback: () => void,
    className?: string
}

export const Button = ({title, callback, className} : ButtonPropsType) => {
    return (
        <button onClick={callback} className={className}>{title}</button>
    );
};

