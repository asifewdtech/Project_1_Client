// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { TTAccountsServices } from "../../../Services/ServiceProviderServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const TTAccounts = new TTAccountsServices();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getTTAccounts_SP = createAsyncThunk("getTTAccounts_SP", async () => {
  const { data } = await TTAccounts.GetAllTTAccountsOfUser(decodedToken().user._id);
  console.log(data);
  // return data
  return data.AllAccounts ? data.AllAccounts : null;
});

// SLICE
const TTAccountsSlice_SP = createSlice({
  name: "TTAccounts_SP",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- INSTAGRAM ACCOUNT API CASES --- */
    builder.addCase(getTTAccounts_SP.pending, (state) => {
      return state;
    })
    builder.addCase(getTTAccounts_SP.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getTTAccounts_SP.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default TTAccountsSlice_SP.reducer;