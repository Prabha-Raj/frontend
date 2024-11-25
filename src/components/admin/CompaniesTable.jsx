import { Edit2, MoreHorizontal, Trash2 } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate()
    useEffect(()=>{
        const filteredCompany = companies?.length >= 0 && companies?.filter((company)=>{
            if(!searchCompanyByText){
            return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        });
        setFilterCompany(filteredCompany)
    },[companies,  searchCompanyByText])
    return (
        <div  className="my-5">
            <Table>
                <TableCaption>A list of your recent registered companies </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                    <TableRow>
                    </TableRow>
                </TableHeader>
                    {
                        filterCompany?.length <= 0 ? <span className="text-red600">You have not register any company here</span> :
                            (
                                <>
                                    {
                                        filterCompany?.map((company) => {
                                            return (
                                                // <div >
                                                    <TableBody key={company._id}>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarImage src={company.logo} />
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{company.name}</TableCell>
                                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                                    <TableCell>
                                                        <Popover className="cursor-pointer">
                                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                            <PopoverContent className="w-32 flex items-center justify-center gap-5">
                                                                <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="cursor-pointer">
                                                                    <Edit2 />
                                                                    <span>Edit</span>
                                                                </div>
                                                                {/* <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="cursor-pointer"> */}
                                                                <div className="cursor-pointer">
                                                                    <Trash2 />
                                                                    <span>Delete</span>
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

export default CompaniesTable
