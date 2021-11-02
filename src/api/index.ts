import axios from "axios";
import ROUTES from "../constants/rotes";
import endpoints from "./endpoints";

const { REACT_APP_API_URL } = process.env;
export const baseURL = `${REACT_APP_API_URL}`;

export const setTokens = (token: string, refreshToken: string): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");

export const getToken = (): string | null => localStorage.getItem("token");

export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tokenInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

tokenInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

type RefreshToken = {
  ChallengeParameters: any;
  AuthenticationResult: {
    AccessToken: string;
    ExpiresIn: number;
    TokenType: string;
    IdToken: string;
  };
};

tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status === 400 &&
      originalRequest.url === `${baseURL}${endpoints.REFRESH_TOKEN}`
    ) {
      window.location.href = ROUTES.login;
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest.url === `${baseURL}${endpoints.REFRESH_TOKEN}`
    ) {
      window.location.href = ROUTES.login;
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post<RefreshToken>(`${baseURL}${endpoints.REFRESH_TOKEN}`, {
          refreshToken,
        })
        .then((res) => {
          let request = null;
          if (res.status === 200) {
            setAccessToken(res.data.AuthenticationResult.AccessToken);
            request = tokenInstance(originalRequest);
          }
          return request;
        })
        .catch((err) => {
          clearToken();
          window.location.href = ROUTES.login;
          return Promise.reject(err);
        });
    }
    // window.location.href = ROUTES.login;
    // return "Pushed to login page";
    return Promise.reject(error);
  }
);
