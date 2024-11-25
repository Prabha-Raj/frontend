
import { Button } from './ui/button'
import {Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate()
    // calculate no og days of job created 
    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
            <div className='flex items-center justify-between '>
                <p className='text-sm text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon" ><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-5 my-2'>
                <Button variant="outline" className="rounded-full" size="icon" >
                    <Avatar>
                        {/* <AvatarImage src='https://img.freepik.com/premium-vector/minimalist-company-logo-template_1286368-135445.jpg?ga=GA1.1.1494204880.1717985110&semt=ais_hybrid' /> */}
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className='text-gray-600'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-500'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position}&nbsp; Positions</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#6a38c2] font-bold" variant="ghost">{job?.salary}&nbsp;LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" onClick={() => navigate(`/jobdescription/${job?._id}`)}>Details</Button>
        <Button className="bg-[#6a38c2] hover:bg-[#4a248d]">Save for later</Button>
      </div>
        </div>
    )
}

export default Job
