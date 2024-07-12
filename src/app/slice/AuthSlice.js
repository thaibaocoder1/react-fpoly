import userApi from "@api/UserApi";
import StorageKeys from "@constants/StorageKeys";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadCart } from "./CartSlice";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.register(payload);
      return fulfillWithValue(userInfo.data);
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
      return fulfillWithValue(userInfo.data.user);
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
        localStorage && localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
      const data = { id: payload, cart };
      await userApi.logout(data);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem("cart");
      return fulfillWithValue(null);
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
  },
  reducers: {
    setEmtpyUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
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
  },
});

const { reducer, actions } = authSlice;
export const { setEmtpyUser } = actions;
export default reducer;