import React from 'react';


type Props = {
    data: string[],
    name: string,
    register: any,
    defaultOption: string
}

const Select = ({data, name, register, defaultOption}: Props) => {
    return (
        <select {...register(name)}>
            <option value={defaultOption}>{defaultOption}</option>
            {data.map(item => <option value={item}>{item}</option>)}
        </select>
    );
};

export default Select;
