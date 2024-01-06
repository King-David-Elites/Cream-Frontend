import toast from "react-hot-toast";
import { error, loading, success } from "./toaster";
import { useRouter } from "next/router";
import axios from "axios";

export const sendQuery = async (text) => {
  const result = await axios.post(
    "https://binaryy-cream-prototype-tobi.hf.space/run/predict",
    {
      data: [text],
    }
  );

  console.log(result.data.data[0]);
  return result.data.data[0];
};

const { default: axiosRequest } = require("./axiosConfig");

export const login = async (email, password, router) => {
  toast.dismiss();
  const toastId = loading("Logging in...");
  const loginData = { email: email, password: password };
  //console.log("stringified details:", loginData);
  await axiosRequest
    .post("/auth/login", loginData)
    .then((response) => {
      toast.dismiss(toastId);
      let token = response.data.data.accessToken;
      const user = response.data.data.user;
      //console.log("token", token);
      if (token) {
        success(response.data.message);
        //console.log("response:", response.data);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else if (response.status === 404) {
        //console.log("user does not exist");
        error("User does not exist");
      } else {
        error("An error occured, try again");
        //console.log("response", response);
      }
      //console.log(response.data.error);
    })
    .catch((err) => {
      toast.dismiss(toastId);
      //console.log(err);
      error(err.response?.data.error) ?? "An error occured";
    });
};

export const register = async (details, router) => {
  const toastId = loading("Signing up...");

  await axiosRequest
    .post("/auth/register", details)
    .then((response) => {
      toast.dismiss(toastId);
      let token = response.data.accessToken;
      if (token) {
        success(
          response.message +
            " \ncheck your email and click the link to verify your account"
        );
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      } else {
        error(response.data.message);
        // console.log("error with code: ", response.data.message);
      }
      //console.log(response);
    })
    .catch((err) => {
      toast.dismiss(toastId);
      toast.dismiss(toastId);
      //console.log(err);
      error(err.response.data.error);
    });
};

export const verifyEmail = async (token, router) => {
  const toastId = loading("Please wait a moment while verifying account...");

  await axiosRequest
    .post("/auth/verify-account", token)
    .then((response) => {
      //toast.dismiss(toastId);

      if (response) {
        toast.dismiss();
        success(response.message);
        console.log(response);

        router.push("/login");
      } else {
        toast.dismiss();
        error(response.data.message);
        // console.log("error with code: ", response.data.message);
      }
      //console.log(response);
    })
    .catch((err) => {
      toast.dismiss(toastId);
      toast.dismiss(toastId);
      console.log(err);
      error(err.response.data.error);
    });
};

export const validateLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

export const getAllListings = async (cat) => {
  let data = [];
  await axiosRequest
    .get(`/listing`)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.message);
      } else {
        error("An Error Occured");
      }

      //console.log(err);
    });
  return data.listings;
};

export const getAListing = async (id) => {
  let data;
  await axiosRequest
    .get(`/listing/${id}`)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.message);
      } else {
        error("An Error Occured");
      }

      //console.log(err);
    });
  return data;
};

export const getDetails = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  return data;
};

export const getListingsPerPage = async (page, category) => {
  let response;
  await axiosRequest
    .get(`/listing/?page=${page}&category=${category}`)
    .then((resp) => {
      //console.log('resp: ', resp)
      response = {
        list: resp.data.data.listings,
        number: resp.data.data.count,
      };
    })
    .catch((err) => console.error(err));
  return response;
};
export const postPropertyRequest = async (name, email, description) => {
  const details = { name: name, email: email, request: description };
  const toastId = loading("Submitting...");
  await axios
    .post("https://cream-v2.onrender.com/api/v2/property-request", details)
    .then((response) => {
      toast.dismiss(toastId);
      if (response) {
        toast.dismiss(loading("Submitted"));
        success(response.data.message);
      } else {
        error(response.data.message);
      }
      //console.log(response);
    })
    .catch((err) => {
      toast.dismiss(toastId);
      if (err.response) {
        error(err.response.data.message);
      } else {
        error("An Error Occured");
      }

      //console.log(err);
    });
};

export const getAllPropertyRequests = async () => {
  let response;
  await axios
    .get(`https://cream-v2.onrender.com/api/v2/property-request`)
    .then((resp) => {
      response = { list: resp.data };
    })
    .catch((err) => console.error(err));
  return response;
};

// export const getUserById = async (id) => {
//   let response;
//   await axios
//     .get(`https://cream-v2.onrender.com/api/v2/user/${id}`)
//     .then((resp) => {
//       response = { list: resp.data };
//     .catch((err) => console.error(err));
//   return response;
// };

export const getUserPropertyRequests = async (id) => {
  let response;
  await axios
    .get(`https://cream-v2.onrender.com/api/v2/property-request/{id}`)
    .then((resp) => {
      response = { list: resp.data };
    })
    .catch((err) => console.error(err));
  return response;
};

export const postArticle = async (formData) => {
  const token = localStorage.getItem("token");
  //console.log("token:", token);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  toast.dismiss();
  const toastId = loading("posting article...");

  await axiosRequest
    .post("/article", formData, { headers: headers })
    .then((response) => {
      toast.dismiss(toastId);
      if (response.status == 200 || response.status == 201) {
        success(response.data.message);
        return true;
      } else {
        error("An error occured, please try again");
      }
      //console.log(response);
      return false;
    })
    .catch((err) => {
      toast.dismiss(toastId);

      error("An error occured, please try again");

      //console.log(err);
      return false;
    });
};

export const getArticles = async () => {
  toast.dismiss();
  // const toastId = toast.loading("Fetching articles...");
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  //console.log("token:", token);
  //console.log("user:", user);

  try {
    const response = await axiosRequest.get("/article");

    toast.dismiss();

    if (response.data) {
      // Handle success
      //toast.success("Articles fetched successfully");
      return response.data; // You can return the data if needed
    } else {
      // Handle non-success status
      toast.error("Failed to fetch articles");
    }
  } catch (err) {
    toast.dismiss();
    // Handle request error
    error(
      err.response?.data.error ?? "An error occurred while fetching articles"
    );
    //console.error(err);
  }
};

// Function for GET by ID request
export const getArticleById = async (articleId) => {
  toast.dismiss();
  //const toastId = toast.loading("Fetching article...");

  try {
    const response = await axiosRequest.get(`/article/${articleId}`);

    toast.dismiss();

    if (response.status >= 200 && response.status < 300) {
      // Handle success
      //toast.success("Article fetched successfully");
      return response.data; // You can return the data if needed
    } else {
      // Handle non-success status
      toast.error("Failed to fetch article");
    }
  } catch (error) {
    toast.dismiss(toastId);
    // Handle request error
    toast.error("An error occurred while fetching article");
    //console.error(error);
  }
};
