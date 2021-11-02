import { createAsyncThunk } from "@reduxjs/toolkit";

export type GetAllProps = {
  offset?: number;
  limit?: number;
  search?: string;
  branch?: number;
  service?: number;
};

type Params = number | GetAllProps;
// type Callback<T> = (params: Params) => Promise<AxiosResponse<T>>;
type Callback = (params: any) => any;
const thunkWrapper = (prefix: string, callback: Callback): any => {
  const name = `${prefix}/${callback.name}`;
  return createAsyncThunk(name, async (params: Params, thunkAPI) => {
    try {
      const response = await callback(params);

      const data = await response.data;
      let resp = {};

      if (response.status === 200) {
        resp = data;
      } else {
        resp = thunkAPI.rejectWithValue(data);
      }

      return resp;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  });
};

export default thunkWrapper;
