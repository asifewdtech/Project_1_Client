// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { Companies } from "../../../Services/CompanyServices";
const Services = new Companies();

// ASYNC THUNK API CALL - GET ALL COMPANIES
export const getAllCompaniesReducer = createAsyncThunk("getAllCompaniesReducer", async () => {
  const response = await Services.GetAllCompanies();
  return response.data.AllCompanies ? response.data.AllCompanies : null;
});

// ASYNC THUNK API CALL - UPDATE SINGL COMPANY
export const updateSingleCompany = createAsyncThunk("updateSingleCompany", async ({ updateTo, id }) => {
  await Services.UpdateSingleCompany(id, { status: updateTo });
  const { data } = await Services.GetAllCompanies();
  console.log(data, "UPDATED");
  return data.AllCompanies;
})

// COMPANY SLICE
export const CompanySlice_AD = createSlice({
  name: "Companies_AD",
  initialState: {
    AllCompanies: null,
    Aprroved: null,
    Pending: null,
    Rejected: null
  },
  extraReducers: (builder) => {
    // GET ALL COMPANIES AND FILTER 'EM ACCORDINGLY
    builder.addCase(getAllCompaniesReducer.pending, (state) => {
      return state;
    })
    // FILTERING
    builder.addCase(getAllCompaniesReducer.fulfilled, (state, action) => {
      return state = {
        AllUsers: action.payload,
        Approved: action.payload.filter((x) => x.status === "APPROVED"),
        Pending: action.payload.filter((x) => x.status === "PENDING"),
        Rejected: action.payload.filter((x) => x.status === "REJECTED")
      };
    })
    builder.addCase(getAllCompaniesReducer.rejected, (state) => {
      return state;
    })

    // UPDATE SINGLE USER AND FILTER 'EM ACCORDINGLY
    builder.addCase(updateSingleCompany.pending, (state) => {
      return state;
    })
    // FILTERING
    builder.addCase(updateSingleCompany.fulfilled, (state, { payload }) => {
      return state = {
        AllUsers: payload,
        Approved: payload.filter((x) => x.status === "APPROVED"),
        Pending: payload.filter((x) => x.status === "PENDING"),
        Rejected: payload.filter((x) => x.status === "REJECTED"),
      };
    })
    builder.addCase(updateSingleCompany.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default CompanySlice_AD.reducer;