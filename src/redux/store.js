import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobs/jobSlicer';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
