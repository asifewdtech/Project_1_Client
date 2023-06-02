// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { SubCategoriesServices } from "../../Services/AdminServices";
const Services = new SubCategoriesServices();

// ASYNC THUNK API CALL - GET ALL CATEGORIES
export const getAllSubCategoriesReducer = createAsyncThunk("getAllSubCategoriesReducer", async () => {
  const { data } = await Services.GetAllSubCategory();
  return data.AllSubCategories ? data.AllSubCategories : null;
})

const SubCategoriesSlice = createSlice({
  name: "SubCategories",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    // GET ALL SUB-CATEGORIES
    builder.addCase(getAllSubCategoriesReducer.pending, (state) => {
      return state;
    });
    builder.addCase(getAllSubCategoriesReducer.fulfilled, (state, { payload }) => {
      return state = payload;
    });
    builder.addCase(getAllSubCategoriesReducer.rejected, (state) => {
      return state;
    });
  }
});

// EXPORT REDUCER
export default SubCategoriesSlice.reducer;