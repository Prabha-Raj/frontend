import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { useParams } from "react-router-dom"
import { setAllApplicants } from "@/redux/applicationSlice"
import { useDispatch, useSelector} from "react-redux"

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store => store.application)
    console.log(applicants?.application?.length)
    useEffect(()=>{
        const fetchAllApplicants = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials:true})
                dispatch(setAllApplicants(res?.data?.job))
                
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllApplicants()
    })
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold my-5">Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants
