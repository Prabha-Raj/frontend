import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const {allJobs} = useSelector(store => store.job);
    return (
        <div className='max-w-7xl mx-auto '>
            <h1 className='text-4xl font-bold'>Latest & Top<span className='text-[#6a38c2] italic'> Job Openings</span> </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
            {
                allJobs.length <= 0 ? <span>Here No Any Job Available </span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id}  job={job}/>)
            }
            </div>
        </div>
    )
}

export default LatestJobs
