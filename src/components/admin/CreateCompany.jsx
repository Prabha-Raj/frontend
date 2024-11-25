import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useState } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState();
    // register new company
    const regitsterNewCompany = async()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,
                {companyName},
                {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                }
            )
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                console.log(res.data)
                const companyId = res?.data?.company?._id;
                console.log("companyId :",companyId)
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">what would you like to give your company name? you can change this later .</p>
        </div>
        <Label className="text-xl ">Company Name</Label>
        <Input 
        type="text"
        className="my-2 text-lg"
        placeholder="JopHunt, Microsoft, Google etc...."
        onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center justify-between my-10">
            <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={regitsterNewCompany} >Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany
