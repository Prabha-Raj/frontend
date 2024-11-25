import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs"

const AdminJobsTable = () => {
    useGetAllAdminJobs()
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate()
    useEffect(() => {
        const filteredJobs = allAdminJobs?.length >= 0 && allAdminJobs?.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.location?.toLowerCase().includes(
                searchJobByText.toLowerCase()
            )
                || job?.company?.name.toLowerCase().includes(
                    searchJobByText.toLowerCase()
                )
                || job?.title?.toLowerCase().includes(
                    searchJobByText.toLowerCase()
                )
        });
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])
    return (
        <div className="my-5">
            <Table>
                <TableCaption>A list of your recent Posted Jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cumpany Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Requirements</TableHead>
                        {/* <TableHead>Description</TableHead> */}
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    <TableRow>
                    </TableRow>
                </TableHeader>
                {
                    filterJobs?.length <= 0 ? <span className="text-red600">You have not register any company here</span> :
                        (
                            <>
                                {
                                    filterJobs?.map((job) => {
                                        return (
                                            // <div >
                                            <TableBody key={job._id}>
                                                <TableCell>{job?.company?.name}</TableCell>
                                                <TableCell>{job?.title}</TableCell>
                                                <TableCell>{job?.requirements}</TableCell>
                                                {/* <TableCell>{job?.description}</TableCell> */}
                                                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                                <TableCell className="text-right">
                                                    <Popover className="cursor-pointer">
                                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                        <PopoverContent className=" flex items-center justify-center gap-5">
                                                            <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className="cursor-pointer">
                                                                <Edit2 />
                                                                <span>Edit</span>
                                                            </div>
                                                            <div className="cursor-pointer">
                                                                <Trash2 />
                                                                <span>Delete</span>
                                                            </div>
                                                            <div className="cursor-pointer" onClick={()=>navigate(`/admin/jobs/${job?._id}/applicants`)}>
                                                                <Eye />
                                                                <span>Applicants</span>

                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableBody>
                                            // </div>
                                        )
                                    })
                                }
                            </>
                        )
                }
            </Table>
        </div>
    )
}

export default AdminJobsTable
