// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { ServicesService } from "../../Services/AdminServices";
// import { decodedToken } from "../../Utilities/AppUtilities";
// const { userLoggedIn } = decodedToken();
const Services = new ServicesService();

// ASYNC THUNK API CALL - GET ALL USERS
export const getAllServicesReducer = createAsyncThunk("getAllServicesReducer", async () => {
  const response = await Services.GetAllServices();
  return response.data.AllServices ? response.data.AllServices : null;
});

// ASYNC THUNK API CALL - UPDATE SINGLE USER
export const updateSingleServiceReducer = createAsyncThunk("updateSingleServiceReducer", async ({ updateTo, service }) => {
  await Services.UpdateSingleService(service._id, {...service, status: updateTo});
  const { data } = await Services.GetAllServices();
  return data.AllServices;
});

// ASYNC THUNK API CALL - FILTER SERVICES BY CATEGORY
export const getFilterServicesAction = createAsyncThunk("filterServicesAction", async (x) => {
  const { data } = await Services.GetFilteredServices(x);
  return data.AllFilteredServices ? data.AllFilteredServices : data;
})

// USERS SLICE
export const ServicesSlice_Admin = createSlice({
  name: "Services_Admin",
  initialState: {
    AllServices: null,
    Aprroved: null,
    Pending: null,
    Rejected: null,
    Filtered: null,
  },
  reducers: {
    // RESET FILTERED SERVICES
    resetFiltered: (state) => {
      return state = {
        ...state,
        Filtered: null
      }
    }
  },
  extraReducers: (builder) => {
    // GET ALL USERS AND FILTER 'EM ACCORDINGLY
    builder.addCase(getAllServicesReducer.pending, (state) => {
      return state;
    })
    // FILTERING
    builder.addCase(getAllServicesReducer.fulfilled, (state, { payload }) => {
      return state = {
        AllServices: payload,
        Approved: payload.filter((x) => x.status === "APPROVED"),
        Pending: payload.filter((x) => x.status === "PENDING"),
        Rejected: payload.filter((x) => x.status === "REJECTED"),
        Filtered: null,
        // CurrentServices: payload.filter((x) => x.serviceProviderId === userLoggedIn._id)
      };
    })
    builder.addCase(getAllServicesReducer.rejected, (state) => {
      return state;
    })

    // UPDATE SINGLE SERVICE AND FILTER 'EM ACCORDINGLY
    builder.addCase(updateSingleServiceReducer.pending, (state) => {
      return state;
    });
    // FILTERING
    builder.addCase(updateSingleServiceReducer.fulfilled, (state, action) => {
      return state = {
        AllServices: action.payload,
        Approved: action.payload.filter((x) => x.status === "APPROVED"),
        Pending: action.payload.filter((x) => x.status === "PENDING"),
        Rejected: action.payload.filter((x) => x.status === "REJECTED"),
        Filtered: null
      };
    });
    builder.addCase(updateSingleServiceReducer.rejected, (state) => {
      return state;
    });

    // FILTER SERVICES
    builder.addCase(getFilterServicesAction.pending, (state) => {
      return state;
    });
    builder.addCase(getFilterServicesAction.fulfilled, (state, { payload }) => {
      // console.log(payload);
      return state = {
        ...state,
        Filtered: payload
      };
    });
    builder.addCase(getFilterServicesAction.rejected, (state) => {
      return state;
    });
  }
});

// EXPORT ACTIONS
export const { resetFiltered } = ServicesSlice_Admin.actions;

// EXPORT REDUCER
export default ServicesSlice_Admin.reducer;