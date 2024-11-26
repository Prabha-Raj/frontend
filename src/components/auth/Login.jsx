import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { USER_API_END_POINT } from '@/utils/constant.js';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitEventHandler = async (e) => {
        e.preventDefault();
        // console.log(input);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message);
                navigate("/")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false));
        }
    }

// protecting route
useEffect(()=>{
    if(user){
        navigate("/")
    }
})

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center gap-5 max-w-7xl mx-auto mt-10'>
                <form onSubmit={submitEventHandler} className='w-1/2 border border-gray-200 rounded-md p-10 my-1 flex flex-col items-start justify-center gap-5'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='w-full'>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com" // Fixed typo: changed 'gail' to 'gmail'
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                        />
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <RadioGroup className="flex items-center justify-between">
                            <div className='flex items-center space-x-2'>
                                <Input
                                    id="role-student"
                                    type="radio"
                                    name="role"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    value="student"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="role-student" className="cursor-pointer">Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    id="role-recruiter"
                                    type="radio"
                                    name="role"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    value="recruiter"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="role-recruiter" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className='w-full flex items-center gap-2'>
                        {
                            loading
                                ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait....</Button>
                                : <Button type="submit" className="w-full">Login</Button>
                        }

                    </div>
                    <div>
                        <span className='text-sm'>Already have an account? <Link to='/signup'>Signup</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
