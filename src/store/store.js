import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import assignmentsReducer from "./assignmentSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    assignments: assignmentsReducer,
  },
});
