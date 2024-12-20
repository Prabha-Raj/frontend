import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem  } from './ui/radio-group'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';


const filterData = [
    {
        filterType:"Location",
        fitlerArray:["Delhi", "Lucknow", "Etawah", "Noida",  "Hydrabad", "Pune", "Mumbai"]
    },
    {
        filterType:"Industry",
        fitlerArray:["Frontend", "Backend", "MERN Stack", "Reactjs", "Nodejs", "PHP Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "MERN Stack Developer"]
    },
    {
        filterType:"Salary",
        fitlerArray:["8-40k", "42-1L", "15-80k", "40-90k"]
    },
]
const FilterCards = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch()
    const changeHandler = (value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchQuery(selectedValue))
        console.log(selectedValue)
    },[selectedValue,dispatch])

  return (
    <div className='w-full bg-white p-3 rounded-md border h-auto'>
      <h1 className='text-2xl font-black'>Filter <span className='text-[#6a38c2] italic' >Jobs</span></h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
            filterData.map((data,index)=>(
                <div key={`${index}+10`} className='font-bold text-lg'>
                    <h1>{data.filterType}</h1>
                    {
                        data.fitlerArray.map((item, idx)=>{
                            return (
                                <div key={`item+${idx}`} className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={`itemId${idx}`} />
                                    <label htmlFor={`itemId${idx}`} className='text-sm text-gray-700 font-bold cursor-pointer'>{item}</label>
                                </div>
                            )

                        })
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCards
