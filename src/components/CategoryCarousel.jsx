import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer",
        "MERN Stack Developer",
        "Dot Net Developer"
    ]


    const jobSearchHandler = (query)=>{
      dispatch(setSearchQuery(query))
      navigate("/browse")
    }
  
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                categories.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Button onClick={()=>jobSearchHandler(item)}  className="rounded-full" variant="outline">{item}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
