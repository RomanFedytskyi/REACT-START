import { createSlice, Slice } from "@reduxjs/toolkit";

export type DefaultSlice<T> = {
  data: [T] | null;
  total: number;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const defaultReducer = (thunk: any, arr = false): Slice =>
  createSlice({
    name: thunk.typePrefix,
    initialState: {
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
      data: arr ? [] : null,
      total: 0,
    },
    reducers: {
      clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
      },
      updateStateData: (state, { payload }) => {
        state.data = payload;
      },
    },
    extraReducers: {
      [thunk.fulfilled.type]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = payload.rows ? payload.row : payload;
        state.total = payload.count ? payload.count : 0;
      },
      [thunk.pending.type]: (state) => {
        state.isFetching = true;
      },
      [thunk.rejected.type]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.message;
      },
    },
  });

export default defaultReducer;
