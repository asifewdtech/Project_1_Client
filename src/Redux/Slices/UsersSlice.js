// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { UsersServices } from "../../Services/AdminServices";
const Services = new UsersServices();

// ASYNC THUNK API CALL - GET ALL SERVICE PRIVIDERS
export const getAllUsersReducer = createAsyncThunk("getAllUsersReducer", async ()=> {
  const response = await Services.GetAllUsers();
  return response.data.AllSP ? response.data.AllSP : null;
});

// ASYNC THUNK API CALL - UPDATE SINGL SERVICE PROVIDER
export const updateSingleUserReducer = createAsyncThunk("updateSingleUserReducer", async ({updateTo, user}) => {
  await Services.UpdateSingleUser(user._id, {...user, status: updateTo});
  const { data } = await Services.GetAllUsers();
  return data.AllSP;
})

// SERVICE PROVIDER SLICE
export const UsersSlice = createSlice({
  name: "Users",
  initialState: {
    AllUsers: null,
    Approved: null,
    Pending: null,
    Rejected: null,
    // ServiceProviders: null
  },
  extraReducers: (builder) => {
    // GET ALL SERVICE PROVIDER AND FILTER 'EM ACCORDINGLY
    builder.addCase(getAllUsersReducer.pending, (state) => {
      return state;
    })
    // FILTERING
    builder.addCase(getAllUsersReducer.fulfilled, (state, action) => {
      return state = {
        AllUsers: action.payload,
        Approved: action.payload.filter((x) => x.status === "APPROVED"),
        Pending: action.payload.filter((x) => x.status ===  "PENDING"),
        Rejected: action.payload.filter((x) => x.status === "REJECTED"),
        // ServiceProviders: action.payload.filter((x) => x.status === "APPROVED" && x.role === "Service Provider")
      };
    })
    builder.addCase(getAllUsersReducer.rejected, (state) => {
      return state;
    })

    // UPDATE SINGLE USER AND FILTER 'EM ACCORDINGLY
    builder.addCase(updateSingleUserReducer.pending, (state) => {
      return state;
    })
    // FILTERING
    builder.addCase(updateSingleUserReducer.fulfilled, (state, action) => {
      return state = {
        AllUsers: action.payload,
        Approved: action.payload.filter((x) => x.status === "APPROVED"),
        Pending: action.payload.filter((x) => x.status ===  "PENDING"),
        Rejected: action.payload.filter((x) => x.status === "REJECTED"),
      };
    })
    builder.addCase(updateSingleUserReducer.rejected, (state) => {
      return state;
    })
  }
});

// EXPORT REDUCER
export default UsersSlice.reducer;