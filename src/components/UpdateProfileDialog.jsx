import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogContent, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill => skill)) || '', 
    file: user?.profile?.resume || ""
  });

  const changeEventHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    setInput((prevInput) => ({ ...prevInput, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills); // Convert skills to array
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log(formData)
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false); // Reset loading state
      setOpen(false);
    }
  };

  return (
    <div className='w-screen'>
      <Dialog open={open} className="w-screen">
        <DialogContent className="w-4/5 max-w-4xl min-h-[500px] bg-white p-6" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4 w-full'>
              {[
                { label: 'Full Name', type: 'text', name: 'fullname', id: 'fullname', value: input.fullname },
                { label: 'Email', type: 'email', name: 'email', id: 'email', value: input.email },
                { label: 'Phone Number', type: 'text', name: 'phoneNumber', id: 'phoneNumber', value: input.phoneNumber },
                { label: 'Bio', type: 'text', name: 'bio', id: 'bio', value: input.bio },
                { label: 'Skills', type: 'text', name: 'skills', id: 'skills', value: input.skills },
              ].map(({ label, type, name, id, value }) => (
                <div key={id} className='flex items-center justify-center gap-4 w-full p-5'>
                  <Label htmlFor={id} className="text-lg ">{label}:</Label>
                  <Input
                    type={type}
                    value={value}
                    onChange={changeEventHandler}
                    name={name}
                    id={id}
                    className='w-full h-10 border border-gray-400 rounded-md outline-none focus:outline-none'
                  />
                </div>
              ))}
              <div key="file" className='flex items-center justify-center gap-4 w-full p-5'>
                <Label htmlFor="file" className="text-lg ">Resume:</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={changeFileHandler}
                  name="file"
                  id="file"
                  className='w-full h-10 border border-gray-400 rounded-md outline-none focus:outline-none'
                />
              </div>
              <div className='w-full flex items-center gap-4 p-5'>
                {
                  loading
                    ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait...</Button>
                    : <Button type="submit" className="w-full">Update</Button>
                }
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
