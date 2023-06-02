// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES & UTILITES
import ServiceProviderServices from "../../Services/ServiceProviderServices";
// TOKEN
import { decodedToken } from "../../Utilities/AppUtilities";

const Services = new ServiceProviderServices();

// ASYNC THUNK API CALL - GET ALL SERVICES FOR LOGGED IN USER
export const getAllServicesReducer_SP = createAsyncThunk("getAllServicesReducer_SP", async() => {
  const userLoggedIn = decodedToken().user;
  const { data } = await Services.GetAllServices_SP(userLoggedIn._id);
  return data ? data.AllServices : null;
});

export const ServicesSlice_SP = createSlice({
  name: "Services_SP",
  initialState: {
    AllServices: null,
    Approved: null,
    Pending: null,
    Rejected: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServicesReducer_SP.pending, (state) => {
      return state;
    });
    // FILTERING
    builder.addCase(getAllServicesReducer_SP.fulfilled, (state, { payload }) => {
      // console.log(payload);
      return payload ? state = {
        AllServices: payload,
        Approved: payload.filter((x) => x.status === "APPROVED"),
        Pending: payload.filter((x) => x.status === "PENDING"),
        Rejected: payload.filter((x) => x.status === "REJECTED")
      } : state = {AllServices: null, Approved: null, Pending: null, Rejected: null};
    });
    builder.addCase(getAllServicesReducer_SP.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default ServicesSlice_SP.reducer;