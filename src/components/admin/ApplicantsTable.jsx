import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";




const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const {applicants} = useSelector(store => store.application)

 const statusHandler = async(status, id)=>{
  try {
    axios.defaults.withCredentials = true
    const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
    if(res.data.success){
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
 }

  return (
    <div>
      <Table>
        <TableCaption >A list of your recent Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right " colspan={2}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item,index)=>(
              
          <TableRow  key={index}>
            <TableCell>{item?.applicant?.fullname}</TableCell>
            <TableCell>{item?.applicant?.email}</TableCell>
            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
            <TableCell className="cursor-pointer">
              {
                item?.applicant?.profile?.resumeOrignalName ?
                <a href={item?.applicant?.profile?.resumeOriginalName}>{ item?.applicant?.profile?.resumeOrignalName}</a>:
                <span>Not Available</span>
              }
              </TableCell>
                
            <TableCell>{item?.applicant?.createdAt?.split("T")}</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal/>
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {
                    shortlistingStatus.map((status, index) => (
                      <div className="cursor-pointer" onClick={()=>statusHandler(status, item._id)} key={index}>
                        <span>{status === "Accepted" ? "Accept" : "Reject" }</span>
                      </div>
                    ))
                  }
                </PopoverContent>
              </Popover>
            </TableCell>
            {/* <TableCell className="flex items-center justify-end gap-10" >
              <button className="text-green-600">Accept</button>
              <button className="text-red-600">Reject</button>
              </TableCell> */}
          </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
