import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:[],
    },
    reducers:{
        setAllApplicants:(state, actions)=>{
            state.applicants = actions.payload;
        }
    }
})
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;