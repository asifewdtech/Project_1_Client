import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: "DASHBOARD",
  reducers: {
    tabUserProfile: (state) => {
      return state = "USER_PROFILE";
    },

    // ADMIN
    tabDashboard: (state) => {
      return state = "DASHBOARD";
    },
    tabUsersAdmin: (state) => {
      return state = "USERS_ADMIN";
    },
    tabServicesAdmin: (state) => {
      return state = "SERVICES_ADMIN";
    },
    tabGetServiceAdmin: (state) => {
      return state = "GET_SERVICE_ADMIN";
    },
    tabCategoriesAdmin: (state) => {
      return state = "CATEGORIES_ADMIN";
    },

    // SERVICE PROVIDER
    tabServicesSP: (state) => {
      return state = "SERVICES_SP";
    },
    tabAccountsSP: (state) => {
      return state = "ACCOUNTS_SP";
    },

    // COMPANY
    tabServicesCOM: (state) => {
      return state = "SERVICES_COMPANY";
    },
    tabServiceProvidersCOM: (state) => {
      return state = "SERVICE_PROVIDERS_COMPANY";
    }
  }
});

// EXPORT ACTIONS
export const {tabUserProfile, tabDashboard, 
              tabCategoriesAdmin, tabUsersAdmin, tabServicesAdmin, tabGetServiceAdmin, 
              tabServicesSP, tabAccountsSP,
              tabServicesCOM, tabServiceProvidersCOM} = tabSlice.actions;

// EXPORT REDUCER
export default tabSlice.reducer;