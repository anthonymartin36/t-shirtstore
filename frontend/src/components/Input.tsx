import React from 'react';

type InputProps = {
    name: string;
    label: React.ReactNode;
    value?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({name, label, value, error, onChange, onBlur}) => {
	return (
		<div>
			    <label
                    htmlFor={name}
                    className="block text-sm font-medium leading-6 text-gray-900">

                {label}
                <input
                    type={name}
                    id={name}
                    required
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`mt-2 block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 ${error ? 'ring-red-500' : 'ring-gray-500'}`}
                />
            </label>
		</div>
	);
};

export default Input;