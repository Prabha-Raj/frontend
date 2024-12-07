import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setUser } from '@/redux/authSlice'; // Adjust the path as needed
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const Navbar = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate()
    const { user } = useSelector((store) => store.auth);

    // const handleLogout = () => {
    //     dispatch(logout()); // Dispatch the logout action
    // };

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                nevigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>MyJob<span className='text-[#f83002] italic'>Market</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>

                                </>
                            ) : (
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className="bg-[#6A38C2] hover:bg-[#5B30A6]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.name || "User"} />
                                        <AvatarFallback>{user.initials || "U"}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user.name || "User"} />
                                            <AvatarFallback>{user.initials || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname || "User Name"}</h4>
                                            <p className='text-sm text-muted-foreground'>{user.email || "user@example.com"}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-start justify-center p-2'>
                                        {
                                            user && user.role === "student" && (
                                                <Link to='/profile' className='flex items-center justify-start gap-2'>
                                                    <User className='cursor-pointer' />
                                                    <Button variant="link">View Profile</Button>
                                                </Link>

                                            )
                                        }
                                        <div className='flex items-center justify-start gap-2' onClick={handleLogout}>
                                            <LogOut className='cursor-pointer' />
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
