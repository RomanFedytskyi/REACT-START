import { AxiosResponse } from "axios";
import { instance } from ".";
import endpoints from "./endpoints";

const usersAPI = {
  getAll(): Promise<AxiosResponse<any>> {
    return instance.get(`${endpoints.USERS}`);
  },
};

export default usersAPI;
