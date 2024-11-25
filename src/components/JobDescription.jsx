import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams()
    const jobId = params.id;
    const {singleJob} = useSelector(store => store.job)
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied,setIsApplied] = useState(isInitiallyApplied)
    useEffect(() => {
        const fetchSingleJobs = async () =>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getjobbyid/${jobId}`, {withCredentials:true});
            if(res?.data?.success){
                dispatch(setSingleJob(res?.data?.job));
                console.log(res)
                setIsApplied(res?.data?.job?.applications?.some(application => application?.applicant === user?._id))  // Ensure the state is in sync with fetched data
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchSingleJobs();
    },[jobId, dispatch, user?._id]);

    const applyJobHandler = async ()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
            console.log("data : ", res.data)
            if(res.data.success){
                setIsApplied(true); // update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); //helps us to ral time ui updates 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position}&nbsp; Positions</Badge>
                        <Badge className="text-[#f83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#6a38c2] font-bold" variant="ghost">{singleJob?.salary}&nbsp; LPA</Badge>
                    </div>
                </div>
                <Button 
                    disabled={isApplied} 
                    onClick={isApplied ? null : applyJobHandler}
                    className={`rounded-lg ${isApplied ? 'bg-green-700 cursor-not-allowed ' : 'bg-[#6a38c2] hover:bg-[#49238b] cursor-pointer'}`}>
                    {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
            </div>
            <h1 className=' border-b border-b-gray-300 font-medium py-4 my-4'>{singleJob?.description}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLavel} years</span></h1>
                <h1 className='font-bold my-1'>salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}&nbsp; LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
