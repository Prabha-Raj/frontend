import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {setAllAppliedJobs} from "../redux/jobSlice"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/getapplications`,{withCredentials:true})
            console.log("jobs",res.data)
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.application))
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    fetchAppliedJobs()
    },[dispatch])
}

export default useGetAppliedJobs
