// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { YTAccountsServices } from "../../../Services/ServiceProviderServices";
import { decodedToken } from "../../../Utilities/AppUtilities";
const YTAccounts = new YTAccountsServices();

// ASYNC THUNK API CALL - GET ALL SERVICE ACCOUNTS
export const getYTAccounts_SP = createAsyncThunk("getYTAccounts_SP", async () => {
  const { data } = await YTAccounts.GetAllYTAccountsOfUser(decodedToken().user._id);
  return data.AllYouTubeAccounts ? data.AllYouTubeAccounts : null;
});

// SLICE
const YTAccountsSlice_SP = createSlice({
  name: "YTAccounts_SP",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    /* --- YOUTUBE ACCOUNT API CASES --- */
    builder.addCase(getYTAccounts_SP.pending, (state) => {
      return state;
    })
    builder.addCase(getYTAccounts_SP.fulfilled, (state, { payload }) => {
      return state = payload;
    })
    builder.addCase(getYTAccounts_SP.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default YTAccountsSlice_SP.reducer;