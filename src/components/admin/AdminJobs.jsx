import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"
import AdminJobsTable from "./AdminJobsTable"
import { setSearchJobByText } from "@/redux/jobSlice"
const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate()
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByText(input))
    },[dispatch,input])
  return (
    <div>
        <Navbar/>
        <div className=" max-w-6xl mx-auto my-10">
            <div className="flex items-center justify-between">
            <Input 
            className="w-fit"
            placeholder="filter by name"
            onChange={(e)=>setInput(e.target.value)}
            >
            </Input>
            <Button onClick={() => navigate("/admin/jobs/create")}>Post New Jobs</Button>
            </div>
            <AdminJobsTable/>            
        </div>
    </div>
  )
}

export default AdminJobs
