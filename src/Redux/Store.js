import { configureStore } from "@reduxjs/toolkit";

// IMPORT SLICES
import tabSlice from "./Slices/TabSlice";
import CategoriesSlice from "./Slices/CategoriesSlice";
import SubCategoriesSlice from "./Slices/SubCategoriesSlice";
import UsersSlice from "./Slices/UsersSlice";
import ServicesSlice_Admin from "./Slices/ServicesSlice_Admin";
import ServicesSlice_SP from "./Slices/ServicesSlice_SP";
import ServiceProviders_Company from "./Slices/ServiceProviders_Company";
import YTAccountsSlice_SP from "./Slices/SocialAccounts_SP/YTAccountsSlice_SP";
import IGAccountsSlice_SP from "./Slices/SocialAccounts_SP/IGAccountsSlice_SP";
import TTAccountsSlice_SP from "./Slices/SocialAccounts_SP/TTAccountsSlice_SP";
import CompanySlice_AD from "./Slices/CompaniesSlice/CompanySlice_AD";


// STORE
export const store = configureStore({
  reducer: {
    tab: tabSlice,
    Categories: CategoriesSlice,
    SubCategories: SubCategoriesSlice,
    Users: UsersSlice,
    Services_Admin: ServicesSlice_Admin,
    Services_SP: ServicesSlice_SP,
    ServiceProviders_Company: ServiceProviders_Company,
    YTAccounts_SP: YTAccountsSlice_SP,
    IGAccounts_SP: IGAccountsSlice_SP,
    TTAccounts_SP: TTAccountsSlice_SP,
    Companies_AD: CompanySlice_AD
  }
});