import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../Config/axios/axios";
import { RootState } from "../Config/redux/ index";

// Define a type for the slice state
interface UserState {
  user: any;
}

// Define the initial state using that type
const initialState: UserState = {
  user: "",
};

export const fetchUser = createAsyncThunk(
  "get/fetchUser",
  async (username: string) => {
    const response = await server.get(
      `authentication/get-user?query=${username}`
    );
    return response.data;
  }
);

export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    // omit posts loading reducers
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // We can directly add the new post object to our posts array
      state.user = action.payload;
    });
  },
});

export const {} = UserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default UserSlice.reducer;
