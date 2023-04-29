import request from "./request";
import axios from "axios";

const getAllProducts = async (filter, navigate, pathname) => {
  const { res, err } = await request({
    url: `/products?limit=8&skip=${filter?.skip}`,
  });
  if (res) {
    navigate(`${pathname}?limit=8&skip=${filter?.skip}`);
    return res;
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getAllProductsData = async () => {
  const { res, err } = await request({ url: `/products?limit=100` });
  if (res) {
    return res;
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getAllProductsOfCategories = async (category) => {
  const { res, err } = await request({ url: `/products/category/${category}` });

  if (!!res) {
    return res;
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getAllProductsCategories = async (callback) => {
  const { res, err } = await request({ url: "/products/categories" });

  if (!!res) {
    callback(res);
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getFullInfo = async (callback, id) => {
  const { res, err } = await request({ url: `/products/${id}` });

  if (!!res) {
    callback(res);
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getProductsSearch = async (query = "") => {
  const { res, err } = await request({ url: `/products/search?q=${query}` });

  if (!!res) {
    return res;
  } else {
    throw new Error(`Couldn't get products: ${err.data}`);
  }
};

const getCity = async (city, callback) => {
  const { res, err } = await request({
    url: "https://api.novaposhta.ua/v2.0/json/",
    method: "POST",
    body: {
      apiKey: "11db3360a446054261266a07fe716f33",
      modelName: "Address",
      calledMethod: "getSettlements",
      methodProperties: {
        FindByString: city,
      },
    },
  });
  if (!!res) {
    callback(res.data);
  } else {
    throw new Error(`Couldn't get city: ${err.data}`);
  }
};

const getPostOfficeNP = async (city, callback) => {
  const { res, err } = await request({
    url: "https://api.novaposhta.ua/v2.0/json/",
    method: "POST",
    body: {
      apiKey: "11db3360a446054261266a07fe716f33",
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: city.Description,
      },
    },
  });
  if (!!res) {
    let data;
    if (city.AreaDescription === "") {
      data = res.data;
    } else {
      data = res.data.filter(
        (el) => el.SettlementAreaDescription === city.AreaDescription
      );
    }
    callback((prev) => ({ ...prev, data }));
  } else {
    throw new Error(`Couldn't get post office: ${err.data}`);
  }
};

const getPostOfficeME = async (city, callback) => {
  const { res, err } = await request({
    url: `https://publicapi.meest.com/branches?city=${city}`,
  });
  if (!!res) {
    callback((prev) => ({ ...prev, data: res.result }));
  } else {
    throw new Error(`Couldn't get post office: ${err.data}`);
  }
};

const getSingleInfoPostOfficeME = async (number, callback) =>{
  const { res, err } = await request({
    url: `https://publicapi.meest.com/branches/${number}`,
  });
  if (!!res) {
    callback(res.result[0])
  } else {
    throw new Error(`Couldn't get post office: ${err.data}`);
  }
}

const getInfoGoogleAuth = async (user, callback) =>{
  axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => console.log(err));
}

export {
  getAllProductsData,
  getProductsSearch,
  getAllProducts,
  getAllProductsOfCategories,
  getAllProductsCategories,
  getFullInfo,
  getCity,
  getPostOfficeNP,
  getPostOfficeME,
  getSingleInfoPostOfficeME,
  getInfoGoogleAuth
};
