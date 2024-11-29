import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Gọi API lấy danh sách coupons
export const fetchCoupons = createAsyncThunk("adminGetList/fetchCoupons", async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/coupons`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });
      return response.data; // Return the data from the API
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  });

const initialState = {
  listCoupons: [],
};

const AdminStoreGetListSlice = createSlice({
  name: "adminGetList",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupons.fulfilled, (state, action) => {
        state.listCoupons = action.payload;
      });
  }
});

export default AdminStoreGetListSlice.reducer;
