// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { Companies } from "../../../Services/CompanyServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const Serrvice = new Companies();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getAllRejectedCompaniesForAdmin = createAsyncThunk("getAllRejectedCompaniesForAdmin", async () => {
  const { data } = await Serrvice.GetAllRejectedCompanies(decodedToken().user._id);
  console.log(data);
  // return data
  return data.AllRejectedCompanies ? data.AllRejectedCompanies : null;
});

// SLICE
const RejectedCompanySlice_AD = createSlice({
  name: "RejectedCompanies_AD",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- COMPANIES API CASES --- */
    builder.addCase(getAllRejectedCompaniesForAdmin.pending, (state) => {
      return state;
    })
    builder.addCase(getAllRejectedCompaniesForAdmin.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getAllRejectedCompaniesForAdmin.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER

export default RejectedCompanySlice_AD.reducer