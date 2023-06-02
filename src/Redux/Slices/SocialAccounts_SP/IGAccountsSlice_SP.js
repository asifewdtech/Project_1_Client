// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { IGAccountsServices } from "../../../Services/ServiceProviderServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const IGAccounts = new IGAccountsServices();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getIGAccounts_SP = createAsyncThunk("getIGAccounts_SP", async () => {
  const { data } = await IGAccounts.GetAllIGAccountsOfUser(decodedToken().user._id);
  console.log(data);
  // return data
  return data.AllAccounts ? data.AllAccounts : null;
});

// SLICE
const IGAccountsSlice_SP = createSlice({
  name: "IGAccounts_SP",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- INSTAGRAM ACCOUNT API CASES --- */
    builder.addCase(getIGAccounts_SP.pending, (state) => {
      return state;
    })
    builder.addCase(getIGAccounts_SP.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getIGAccounts_SP.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default IGAccountsSlice_SP.reducer;