// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { Companies } from "../../../Services/CompanyServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const Serrvice = new Companies();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getAllApprovedCompaniesForAdmin = createAsyncThunk("getAllApprovedCompaniesForAdmin", async () => {
  const { data } = await Serrvice.GetAllApprovedCompanies(decodedToken().user._id);
  console.log(data);
  // return data
  return data.AllApprovedCompanies ? data.AllApprovedCompanies : null;
});

// SLICE
const ApprovedCompanySlice_AD = createSlice({
  name: "ApprovedCompanies_AD",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- COMPANIES API CASES --- */
    builder.addCase(getAllApprovedCompaniesForAdmin.pending, (state) => {
      return state;
    })
    builder.addCase(getAllApprovedCompaniesForAdmin.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getAllApprovedCompaniesForAdmin.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER

export default ApprovedCompanySlice_AD.reducer