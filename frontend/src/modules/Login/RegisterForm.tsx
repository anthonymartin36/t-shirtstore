import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerCustomerApi } from '../../apis/login';

const RegisterForm: React.FC = () => {

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            const response = await registerCustomerApi(name, email, password);
            console.log('Registration successful:', response);
            // You can add further actions here, like redirecting the user
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }
    //registerCustomerApi(Name, Email, Password))
	return (
		<div>
            <form className="flex flex-col gap-4 mt-10" onSubmit={handleRegister}>
                <Input label="Name" name="name" />
                <Input label="Email Address" name="email" />
                <Input label="Password" name="password" />
                <Button type="submit" text="Sign In" handleClick={() => {}} />
            </form>
		</div>
    )
};

export default RegisterForm