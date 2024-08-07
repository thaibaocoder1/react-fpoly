import userApi from "@api/UserApi";
import StorageKeys from "@constants/StorageKeys";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadCart } from "./CartSlice";
import { loadCoupon } from "./CouponSlice";
import { loadWishList } from "./WishlistSlice";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.register(payload);
      return fulfillWithValue(userInfo.created);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const active = createAsyncThunk(
  "auth/active",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.active(payload);
      return fulfillWithValue(userInfo.isActive);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const userInfo = await userApi.login(payload);
      localStorage.setItem(StorageKeys.TOKEN, userInfo.data.accessToken);
      dispatch(loadCart(userInfo.data.user.cart));
      dispatch(loadCoupon(userInfo.data.user.coupon));
      dispatch(loadWishList(userInfo.data.user.wishlist));
      return fulfillWithValue(userInfo.data.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const forgot = createAsyncThunk(
  "auth/forgot",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.forgot(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const reset = createAsyncThunk(
  "auth/reset",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.reset(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const recover = createAsyncThunk(
  "auth/recover",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.requestRecover(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const confirmRecover = createAsyncThunk(
  "auth/confirmRecover",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.confirmRecover(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.refreshToken();
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.change(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const cart =
        localStorage && localStorage.getItem(StorageKeys.CART)
          ? JSON.parse(localStorage.getItem(StorageKeys.CART))
          : [];
      const coupon =
        localStorage && localStorage.getItem(StorageKeys.COUPON)
          ? JSON.parse(localStorage.getItem(StorageKeys.COUPON))
          : [];
      const wishlist =
        localStorage && localStorage.getItem(StorageKeys.WISHLIST)
          ? JSON.parse(localStorage.getItem(StorageKeys.WISHLIST))
          : [];
      const data = { id: payload, cart, coupon, wishlist };
      await userApi.logout(data);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.COUPON);
      return fulfillWithValue(null);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const update = createAsyncThunk(
  "auth/update",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.update(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateFieldAccount = createAsyncThunk(
  "auth/updateFieldAccount",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await userApi.updateField(payload);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
    isAdmin: false,
    created: false,
    isActive: false,
  },
  reducers: {
    setEmtpyUser(state) {
      state.user = null;
    },
    setEmtpyError(state) {
      state.error = "";
    },
    setEmtpyActive(state) {
      state.isActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.created = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(active.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(active.fulfilled, (state, action) => {
      state.isActive = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(active.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(forgot.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgot.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(forgot.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(reset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reset.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(reset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(recover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(recover.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(recover.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(confirmRecover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmRecover.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(confirmRecover.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateFieldAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFieldAccount.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateFieldAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAdmin = action.payload.role === "Admin" ? true : false;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      state.isAdmin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = authSlice;
export const { setEmtpyUser, setEmtpyError, setEmtpyActive } = actions;
export default reducer;
