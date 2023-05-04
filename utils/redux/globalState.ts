import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GlobalState {
  checkoutData: any;
}

// Define the initial state using that type
const initialState: GlobalState = {
  checkoutData: {},
};

export const globalSlice = createSlice({
  name: "checkout",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      state.checkoutData = action.payload;
    },
  },
});

export const { setCheckout } = globalSlice.actions;

export default globalSlice.reducer;
