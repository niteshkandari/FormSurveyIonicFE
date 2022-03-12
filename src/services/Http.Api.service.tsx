import axios from "axios";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

let operationsAllowed = {};

const HttpApiServiceContext = createContext(operationsAllowed);

export const HttpApiServiceProvider = (props: any) => {
  const bearerToken = useSelector((state: any) => state.tokenReducer.token);
  // const BASE_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = '';

  const getHeaders = () => {
    return {
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
    };
  };

  const handleError = (error: Error) => {
    let errorMessage = "Something went wrong, Please try after sometime.";
    const err: any = { ...error };
    if (err?.response?.data?.message) {
      errorMessage = err?.response?.data?.message;
    } else {
      const { message } = error;
      errorMessage = message;
    }
    return errorMessage;
  };

  const get = (path: string, header = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}${path}`, header)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const patch = (path: string, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}${path}`, data, getHeaders())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const post = (path: string, data: any, headers = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}${path}`, data, headers)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const remove = (path: string, headers = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}${path}`, headers)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  operationsAllowed = {
    get,
    patch,
    post,
    remove,
  };

  return (
    <HttpApiServiceContext.Provider value={operationsAllowed}>
      {props.children}
    </HttpApiServiceContext.Provider>
  );
};

export const useHttpApiService = () => {
  return useContext(HttpApiServiceContext);
};
