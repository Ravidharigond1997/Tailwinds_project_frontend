import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments.unshift(action.payload);
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map(a => a._id === action.payload._id ? action.payload : a);
    },
  },
});

export const { setAssignments, addAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
