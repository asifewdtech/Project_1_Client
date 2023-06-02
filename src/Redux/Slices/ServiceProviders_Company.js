// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import CompanyServices from "../../Services/CompanyServices";
const Services = new CompanyServices();

// ASYNC THUNK API CALL - GET ALL SERVICE PROVIDERS
export const getAllServiceProvidersThunk = createAsyncThunk("getAllServiceProvidersThunk", async () => {
  const { data } = await Services.GetAllServiceProviders();
  return data.AllSP ? data.AllSP : null;
});

const ServiceProviders_Company = createSlice({
  name: "ServiceProviders_Company",
  initialState: {
    AllServiceProviders: null,
    FilteredServiceProviders: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    // GET ALL SERVICE PROVIDER
    builder.addCase(getAllServiceProvidersThunk.pending, (state) => {
      return state;
    });
    builder.addCase(getAllServiceProvidersThunk.fulfilled, (state, {payload}) => {
      return state = {
        AllServiceProviders: payload,
        FilteredServiceProviders: null
      };
    });
    builder.addCase(getAllServiceProvidersThunk.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default ServiceProviders_Company.reducer;