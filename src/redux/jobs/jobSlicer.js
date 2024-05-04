import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchJobs from "../../api/jobs";

export const fetchJobsAsync = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ limit, offset }) => {
    const response = await fetchJobs(limit, offset);
    return response;
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
