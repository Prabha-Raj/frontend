import { useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Download, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skillsArray = ["MERN Stack", "Python", "Django", "PHP", "MySQL", "Bootstrap", "Tailwind CSS", "Shadcn UI", "JAVA", "JavaScript", "C", "C++"]
const Profile = () => {
    useGetAppliedJobs()
    const isResume = true;
    const [open, setOpen] = useState(false);
    const {user} = useSelector((store)=>store.auth)
    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 px-8'>
                <div className='fles items-center justify-between'>
                    <div className='flex items-center justify-between gap-4 mb-5'>
                        <div className='flex items-center '>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src='https://img.freepik.com/premium-vector/minimalist-company-logo-template_1286368-135445.jpg?ga=GA1.1.1494204880.1717985110&semt=ais_hybrid' />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'> {user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right cursor-pointer" variant="outline">
                            <Pen className='cursor-pointer'/>
                        </Button>
                    </div>
                </div>
                <div>
                    <div className='flex items-center gap-5 my-2'>
                        <Mail />
                        <a href='mailto:prabhakarrajput78824@gmail.com'>{user.email}</a>
                    </div>
                    <div className='flex items-center gap-5 my-2'>
                        <Contact />
                        <a href='callto:8630049758'>{user.phoneNumber}</a>
                    </div>
                </div>
                <div>
                    <h1 className='my-5 text-2xl font-bold '>My Skills</h1>
                    <div className='flex items-center gap-3 my-3'>
                    {
                        user?.profile?.skills.length !== 0 
                        ? user?.profile?.skills.map((item, index)=> <Badge key={index} className="cursor-pointer">{item}</Badge>) 
                        : <span>NA</span>
                    }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 my-5'>
                    <Label className="text-md font-bold">Resume/CV</Label>
                    
                    {
                        isResume 
                        ?   <a className='flex item-center gap-3 text-blue-500 hover:underline' href={user?.profile?.resume} target='blanck'>
                                {user?.profile?.resumeOrignalName} 
                                <Download className='cursor-pointer'/>
                            </a> 
                        :   <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-8'>
                <h1 className='font-bold text-xl my-3'>Applied Jobs</h1>
                <AppliedJobsTable/>
            </div>
            {/* dilog for edit profile */}
            
            <UpdateProfileDialog open={open} setOpen={setOpen}/>

            <Footer />
        </div>
    )
}

export default Profile

