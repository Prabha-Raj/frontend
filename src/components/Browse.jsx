
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';
import { Search } from 'lucide-react';


// const randomJobs = [1, 2, 3, 4, 5, 6];
const Browse = () => {
  useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
  // console.log("alljobs",allJobs)
  const [query, setQuery] = useState('');
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(setSearchQuery(""))
  })

  const jobSearchHandler =  () => {
    dispatch(setSearchQuery(query))
  }
  

  return (
    <div>
      <Navbar/>

        <div className='max-w-7xl mx-auto my10'>
            <div className=' flex items-center justify-between'>
            <h1 className='font-bold  w-[70%] text-xl my-10'>Search Results ({allJobs.length})</h1>
            <div className='flex w-[30%] h-14 shadow-lg border border-gray-200 pl-7  rounded-full items-center gap4 mx-auto'>
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
            
            <div className='grid grid-cols-3 gap-4'>
        {
            allJobs.map((job)=>{
                return (<Job key={job._id} job={job}/>)
            })
        }
        </div>

        </div>


      <Footer/>
    </div>
  )
}

export default Browse
