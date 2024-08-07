import axiosClient from "./AxiosClient";

const productApi = {
  async getWithParams(params, config = {}) {
    const url = "/products";
    const request = axiosClient.get(url, {
      ...params,
      signal: config,
    });
    return await request;
  },
  async getAll(config = {}) {
    const url = "/products/all";
    const request = axiosClient.get(url, {
      signal: config,
    });
    return await request;
  },
  async getRelatedProducts(productId, config = {}) {
    const url = "/products/list";
    const request = axiosClient.get(`${url}/${productId}`, { signal: config });
    return await request;
  },
  async getOne(id, config = {}) {
    const url = "/products";
    return await axiosClient.get(`${url}/${id}`, { signal: config });
  },
  async create(data) {
    const url = "/products/save";
    return await axiosClient.post(`${url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async update(data) {
    const url = "/products/update";
    return await axiosClient.patch(`${url}/${data.get("id")}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async updateField(data) {
    const url = "/products";
    return await axiosClient.patch(`${url}/update-fields`, data);
  },
  async addReview(data) {
    const url = "/products";
    return await axiosClient.post(`${url}/review`, data);
  },
};

export default productApi;
