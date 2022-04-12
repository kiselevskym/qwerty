import React from 'react';

type Props = {
    type?: string,
    name: string
    register: any
}

const Input = ({type = 'text', name, register}: Props) => {
    return (
        <input type={type} {...register(name)}/>
    );
};

export default Input;
