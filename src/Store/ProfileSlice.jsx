import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LeaderApi from "../Api/LeaderApi";
import axiosInstance from "../Api/axiosInstance";
import { act } from "react";

export const ViewProfile=createAsyncThunk("profile/viewmyProfile",
    async(_,{rejectWithValue })=>{
        try{
            const res=await LeaderApi.ViewMyProfile();
            return res.data;
        }
        catch(err){
            return rejectWithValue (err.response.data || err.message);
        }
    }
);

export const EditProfile=createAsyncThunk("profile/editProfile",
    async(formData,{rejectWithValue})=>{
        try{

            const res=await LeaderApi.EditProfile(formData);
            return res.data;
        }
        catch(err){
            return rejectWithValue (err.response.data || err.message);
        }
    }
);

export const ChangePassword=createAsyncThunk("profile/changePassword",
    async(data,{rejectWithValue})=>{
        try{
            const res=await LeaderApi.ChangePassword(data);
            return res.data;
        }
        catch(err){
            return rejectWithValue (err.response.data || err.message);
        }
    });

    const ProfileSlice=createSlice({
        name:"profile",
        initialState:{
            data:null,
            loading:false,
            erroe:null,
            successMessage:null
        },
        reducers:{
            clearMessages:(state)=>{
                state.error=null;
                state.successMessage=null;
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(ViewProfile.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(ViewProfile.fulfilled,(state,action)=>{
                state.loading=false;
                state.data=action.payload.data;
            })
            .addCase(ViewProfile.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })



            .addCase(EditProfile.pending,(state)=>{
                state.loadng=true;
                state.error=null;
                state.successMessage=null;
            })
            .addCase(EditProfile.fulfilled,(state,action)=>{
                state.loading=false;
                state.data={...state.data,...action.payload.data};
                state.successMessage=action.payload.message;

            })

            .addCase(EditProfile.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })



            .addCase(ChangePassword.pending,(state)=>{
                state.loading=true;
                state.err=null;
                state.successMessage=null;
            })

            .addCase(ChangePassword.fulfilled,(state,action)=>{
                state.loading=false;
                state.successMessage=action.payload.message;
            })

            .addCase(ChangePassword.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            
        }
    });
    export const {clearMessages}=ProfileSlice.actions;
    export default ProfileSlice.reducer;