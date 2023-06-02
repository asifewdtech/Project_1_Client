// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SERVICES
import { CategoriesServices } from "../../Services/AdminServices";
const Services = new CategoriesServices();

// ASYNC THUNK API CALL - GET ALL CATEGORIES
export const getAllCategoriesReducer = createAsyncThunk("getAllCategoriesReducer", async () => {
  const { data } = await Services.GetAllCategories();
  return data.AllCategories ? data.AllCategories : null;
})

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState: null,
  reducers: {

  },
  extraReducers: (builder) => {
    // GET ALL CATEGORIES
    builder.addCase(getAllCategoriesReducer.pending, (state) => {
      return state;
    });
    builder.addCase(getAllCategoriesReducer.fulfilled, (state, { payload }) => {
      return state = payload;
    });
    builder.addCase(getAllCategoriesReducer.rejected, (state) => {
      return state;
    });
  }
});

// EXPORT REDUCER
export default CategoriesSlice.reducer;