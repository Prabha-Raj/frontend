import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
// import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const jobSearchHandler =  () => {
    dispatch(setSearchQuery(query))
    // navigate("/browse")
  }
  

  return (
    <div className='text-center'>
      <div className='flex flex-col items-center gap-6 my-10'>
        <span className='px-4 py-2 mx-auto rounded-full bg-gray-100 text-[#f83002] font-medium'>Your Welcome at No. 1 <span className='font-bold'>Job<i>Market</i> Place</span></span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6a38c2] italic'>Dream Jobs</span></h1>
        <p className='text-gray-600 w-[60%]'><span className='font-bold'>MyJob<i>Market</i></span> is a cutting-edge platform designed to connect job seekers and employers seamlessly. It simplifies the job-hunting process by offering a user-friendly interface and powerful search capabilities. Employers can easily post vacancies, while job seekers can find opportunities tailored to their skills and preferences. <span className='font-bold'>MyJob<i>Market</i></span> ensures</p>
        <div className='flex w-[50%] h-14 shadow-lg border border-gray-200 pl-7  rounded-full items-center gap4 mx-auto'>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder='Find your dream jobs'
            className='outline-none focus:outline-none border-none text-xl  w-full'
          />
          <Button onClick={jobSearchHandler} className="rounded-r-full h-14 w-14 bg-[#6a38c2]">
            <Search className='h-8 w-8' />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default HeroSection
