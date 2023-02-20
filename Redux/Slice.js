import {createSlice} from '@reduxjs/toolkit';

export const Slice = createSlice({
    name:'productslice',
    initialState:{
        product:{
            name:'',
            price:0,
            image:'',
            productlog:false,
            prodid:0,
            prqty:'',
        }
    },
    reducers:{
        prodStatus:(state,action) =>{
            state.product = action.payload;
        }
    },
})