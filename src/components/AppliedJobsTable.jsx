import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
  const {allAppliedJobs} = useSelector(store=> store.job)
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Applied Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
              allAppliedJobs?.length <= 0 ? <span>You have not Applied in any job yet</span>:
                allAppliedJobs.map((appliedJob)=>(
                    <TableRow key={appliedJob?._id}>
                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob?.job?.title}</TableCell>
                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={appliedJob?.status === "rejected" ? "bg-red-600" : appliedJob?.status === "accepted" ? "bg-green-600" : "bg-gray-400"}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobsTable
