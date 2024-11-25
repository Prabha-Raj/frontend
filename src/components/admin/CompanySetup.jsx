import { ArrowLeft, Loader2 } from "lucide-react"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import useGetCompanyById from "@/hooks/useGetCompanyById"
const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [loading, setLoading] = useState(false);
    // console.log(params.id)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    })

    const {singleCompany} = useSelector(store => store.company)
// console.log("single ", singleCompany)
    const changeEventHandler = async(e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

const changeFileHandler = (e)=>{
    const file = e.target.files?.[0];
    setInput({...input, file})
    
}


const submitHandler = async(e)=>{
    e.preventDefault();
    // console.log(input);
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if(input.file){
    formData.append("file", input.file)
    }

    try {
        setLoading(true)
        const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
            headers:{
            "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        if(res?.data?.success){
            toast.success(res.data.message);
            navigate("/admin/companies");
        }
    } catch (error) {
        toast.error(error.response.data.message);
        console.error(error)
    }finally{
        setLoading(false);
    }
}

useEffect(()=>{
    setInput({
        name:singleCompany?.name || "",
        description:singleCompany?.description || "",
        website:singleCompany?.website ||  "",
        location:singleCompany?.location || "",
        file:singleCompany?.file || null
    })
},[singleCompany])


  return (
    <div>
        <Navbar/>
        <div className="max-w-xl mx-auto my-10">
            <form action="" onSubmit={submitHandler}>
                <div className="flex items-center justify-between p-8">
                <Button 
                className="flex items-center gap-3 text-gray-500 font-semibold cursor-pointer"
                onClick={()=>navigate("/admin/companies")}
                >
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                <h1 className="font-bold text-xl ">Company Setup</h1>
                </div>
                <div className="my-2">
                <Label>Company Name</Label>
                <Input 
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter Your Company Name"
                />

                </div>
                <div className="my-2">
                <Label>Description</Label>
                <Input 
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter Description of your Compnay"
                />
                </div>
                <div className="my-2">
                <Label>Website</Label>
                <Input 
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="Enter URl of your Company"
                />
                </div>
                <div className="my-2">
                <Label>Location</Label>
                <Input 
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter Location of your Company"
                />
                </div>
                <div className="my-2">
                <Label>Upload Company Logo</Label>
                <Input 
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                placeholder="Choose Your Company logo"
                />
                </div>
                <div className='w-full flex items-center gap-4 p-5'>
                {
                  loading
                    ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button>
                    : <Button type="submit" className="w-full">Update</Button>
                }
              </div>
            </form>

        </div>
    </div>
  )
}

export default CompanySetup
