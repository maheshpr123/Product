import {configureStore} from '@reduxjs/toolkit';

const { Slice } = require("./Slice");

const mainstore=configureStore({
    reducer:{
        changeProductReducer:Slice.reducer,
    }
})
export default mainstore;