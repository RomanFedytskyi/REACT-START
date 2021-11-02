import thunkWrapper from "../api/thunkWrapper";
import usersAPI from "../api/usersApi";
import defaultReducer from "./defaultReducer";
import { RootState } from "./store";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type GetAllUsersType = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  data: User[];
};

export const getAllUsers = thunkWrapper("usersAPI", usersAPI.getAll);

export const usersGetAllSlice = defaultReducer(getAllUsers);
export const { clearState, updateStateData } = usersGetAllSlice.actions;

export const usersGetAllSelector = (state: RootState): GetAllUsersType =>
  state.users.getAll;
