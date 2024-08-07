import productApi from "@api/ProductApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await productApi.getAll(_, signal);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsWithParams = createAsyncThunk(
  "product/getProductsWithParams",
  async (params, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await productApi.getWithParams(params, signal);
      return fulfillWithValue({
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsNoParams = createAsyncThunk(
  "product/getProductsNoParams",
  async (searchTerm, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await productApi.getAll(searchTerm, signal);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsCart = createAsyncThunk(
  "product/getProductsCart",
  async (_, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await productApi.getAll(signal);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getRelatedProducts = createAsyncThunk(
  "product/getRelatedProducts",
  async (payload, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await productApi.getRelatedProducts(payload, signal);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOneProduct = createAsyncThunk(
  "product/getOne",
  async (payload, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const res = await productApi.getOne(payload, signal);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await productApi.create(payload);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await productApi.update(payload);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateFieldProduct = createAsyncThunk(
  "product/updateFieldProduct",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await productApi.updateField(payload);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addReview = createAsyncThunk(
  "product/addReview",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const res = await productApi.addReview(payload);
      dispatch(getOneProduct(payload.productId));
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: {
      products: [],
      cart: [],
      pagination: {},
      related: [],
    },
    current: null,
    loading: false,
    error: "",
  },
  reducers: {
    removeCurrentProduct(state) {
      state.current = null;
    },
    setEmptyError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsWithParams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsWithParams.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.data = { ...state.data, products: data, pagination };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getProductsWithParams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductsNoParams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsNoParams.fulfilled, (state, action) => {
      state.data = { ...state.data, products: action.payload, pagination: {} };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getProductsNoParams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductsCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsCart.fulfilled, (state, action) => {
      state.data = { ...state.data, cart: action.payload, pagination: {} };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getProductsCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getRelatedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRelatedProducts.fulfilled, (state, action) => {
      state.data = { ...state.data, related: action.payload };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getRelatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.current = action.payload;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addReview.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateFieldProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFieldProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateFieldProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = productSlice;
export const { removeCurrentProduct, setEmptyError } = actions;
export default reducer;
