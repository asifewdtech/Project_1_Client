// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { Companies } from "../../../Services/CompanyServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const Serrvice = new Companies();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getAllPendingCompaniesForAdmin = createAsyncThunk("getAllPendingCompaniesForAdmin", async () => {
  const { data } = await Serrvice.GetAllPendingCompanies(decodedToken().user._id);
  console.log(data);
  // return data
  return data.AllPendingCompanies ? data.AllPendingCompanies : null;
});

// SLICE
const PendingCompanySlice_AD = createSlice({
  name: "PendingCompanies_AD",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- COMPANIES API CASES --- */
    builder.addCase(getAllPendingCompaniesForAdmin.pending, (state) => {
      return state;
    })
    builder.addCase(getAllPendingCompaniesForAdmin.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getAllPendingCompaniesForAdmin.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER

export default PendingCompanySlice_AD.reducer