import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

function Login() {
    const { toast } = useToast();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const loginHandler = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/api/v1/users/login',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: res.data.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.message || "Login failed",
            });
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
            <Input 
                value={user.email} 
                name="email" 
                onChange={changeHandler} 
                type="email" 
                placeholder="Email"
                className="max-w-xs"
            />
            <Input 
                value={user.password} 
                name="password" 
                onChange={changeHandler} 
                type="password" 
                placeholder="Password"
                className="max-w-xs"
            />
            <Button onClick={loginHandler}>Login</Button>
        </div>
    );
}

export default Login;