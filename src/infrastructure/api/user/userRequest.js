import axios from "axios";
import globalApi from "@/Components/api";
import services from "@/ioc/services";

const BASEURL = "https://cream-v2.onrender.com/api/v2";

// """http://localhost:9099"

export const login = async (userDetails) => {
  try {
    const res = await axios.post(`${BASEURL}/users/sign-in`, userDetails);    
    // res.data.data.authToken = res.headers.token;
    return res.data;
  } catch (err) {
    return err.data;
  }
};

export const signUp = async (userDetails) => {
  try {
    const res = await axios.post(`${BASEURL}/users/sign-up`, userDetails);
    // res.data.data.authToken = res.headers.token;
    return res.data;
  } catch (err) {
    return err.data;
  }
};

export const getSignedInUser = async () => {
  try {
    const res = await axios.get(`${BASEURL}/users/me`, setConfig());
    return res.data;
  } catch (err) {
    return err.data;
  }
};

export const getUser = async () => {
  await axios
    .get(`${globalApi}/users/me`, setConfig())
    .then((resp) => {
      localStorage.setItem("user", JSON.stringify(resp.data));      
    })
    .catch((err) => {      
      getUser()
      console.error(err);
    });
};

export const requestUserData = () => {
  let response;
  response = localStorage.getItem("user");
  if (response === null || response === undefined) {
    response = [];
  } else {
    response = JSON.parse(response);
  }
  return response;
};

export const updateUserProfile = async (userDetails) => {
  const res = await axios.patch(
    `${BASEURL}/users/update`,
    userDetails,
    setConfig()
  );
  return res;
};

export const setConfig = () => {
  const authToken = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      ContentType: "application/x-www-form-urlencoded",
    },
  };

  return config;
};

export const getStates = async (countryIso, setStateData) => {  
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "bWxLejVmcWtRSTg1ekRyaXlKZ3l1YjN2MHI1OFBwUWVDYkVCbWNNVw=="
  );

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    `https://api.countrystatecity.in/v1/countries/${countryIso}/states`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      setStateData(JSON.parse(result));      
    })
    .catch((error) => console.log("error", error));
};

export const getCities = async (countryIso, stateIso, setCityData) => { 
  var headers = new Headers();
  headers.append(
    "X-CSCAPI-KEY",
    "bWxLejVmcWtRSTg1ekRyaXlKZ3l1YjN2MHI1OFBwUWVDYkVCbWNNVw=="
  );

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(
    `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {            
      setCityData(JSON.parse(result));      
    })
    .catch((error) => console.log("error", error));
};

export const getListings = async (page, category, setListing, setLoading) => {
  let response;
  await axios
    .get(`${globalApi}/listings/all?page=${page}&category=${category}`)
    .then((resp) => {
      setListing(resp.data.listings);
      setLoading(false);
      response = resp.data.noOfListings;
    })
    .catch((err) => console.error(err));
  return response;
};

export const getCartItems = async () => {
  await axios
    .get(`${globalApi}/carts/`, setConfig())
    .then((resp) => {
      localStorage.setItem("cartItems", JSON.stringify(resp.data.collectibles));
    })
    .catch((err) => console.error(err));
};

export const addToCartItems = async (body) => {
  await axios
    .patch(`${globalApi}/carts/add/`, body, setConfig())
    .then((resp) => {            
      localStorage.setItem("cartItems", JSON.stringify(resp.data.collectibles));
    })
    .catch((err) => console.error(err));
};

export const removeCartItems = async (body) => {
  await axios
    .patch(`${globalApi}/carts/remove/`, body, setConfig())
    .then((resp) => {            
      localStorage.setItem("cartItems", JSON.stringify(resp.data.collectibles));
    })
    .catch((err) => console.error(err));
};

export const clearCartItems = async () => {
  await axios
    .patch(`${globalApi}/carts/clear`, {}, setConfig())
    .then((resp) => {            
      console.log(resp.data);
    })
    .catch((err) => console.error(err));
};

export const requestCartItems = () => {
  let response;
  response = localStorage.getItem("cartItems");
  if (response === null || response === undefined) {
    response = [];
  } else {
    response = JSON.parse(response);
  }
  return response;
};

export const deleteCartItems = async (body) => {
  await axios
    .patch(`${globalApi}/carts/delete-multiple/`, body, setConfig())
    .then((resp) => {            
      localStorage.setItem("cartItems", JSON.stringify(resp.data.collectibles));
      console.log(resp.data);
    })
    .catch((err) => console.error(err));
};
