import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant.JS';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate()
    const {loading, user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitEventHandler = async (e) => {
        e.preventDefault();
        // console.log(input);

        const formData = new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("password",input.password)
        formData.append("role",input.role)
        if(input.file){
            formData.append("file",input.file)
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false));
        }
    };

    // protecting our route
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
                    <h1 className='font-bold text-xl mb-5'>Signup</h1>
                    <div className='w-full'>
                        <Label htmlFor="fullname">Full Name:</Label>
                        <Input 
                            id="fullname"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="email">Email:</Label>
                        <Input 
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com" // Fixed typo from 'gail' to 'gmail'
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="phoneNumber">Phone Number:</Label>
                        <Input 
                            id="phoneNumber"
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8630XXXX89"
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
                            placeholder="Password"
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
                        <Label htmlFor="profile">Profile Picture:</Label>
                        <Input 
                            id="profile"
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                            name="file"
                        />
                    </div>
                    <div className='w-full flex items-center gap-2'>
                        {
                            loading 
                            ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait.......</Button>
                            : <Button type="submit" className="w-full">Signup</Button>
                        }
                    </div>
                    <div>
                        <span className='text-sm'>Already have an account? <Link to='/login'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
