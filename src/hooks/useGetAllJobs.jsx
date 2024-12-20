import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { ChevronsLeftIcon } from "lucide-react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
const token=sessionStorage.getItem("token")
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store=>store.job)
    useEffect(() => {
        const fetchAllJobs = async () =>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getalljobs?keyword=${searchQuery}`, {withCredentials:true,headers:{
                "Content-Type":"aplication/json",
                Authorization:`Bearer ${token}`
            }});
            ChevronsLeftIcon
            console.log("re",res)
            if(res.data.success){
                // console.log("rs",res.data.jobs)
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchAllJobs();
    });
}
export default useGetAllJobs
