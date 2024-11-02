import { RootState } from "@/redux/store";
import { TCar } from "@/tyeps";
import { createSlice } from "@reduxjs/toolkit";

type TBookingState = {
  wishListCarInfo: {
    wishCar: Partial<TCar> | undefined;
    additionalFeatures: string[];
    additionalInsurance: string[];
  };
};

const initialState: TBookingState = {
  wishListCarInfo: {
    wishCar: undefined,
    additionalFeatures: [],
    additionalInsurance: [],
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      initialState;
      const { wishListCarInfo } = action.payload;
      state.wishListCarInfo.wishCar = wishListCarInfo.car;
      state.wishListCarInfo.additionalFeatures =
        wishListCarInfo.additionalFeatures;
      state.wishListCarInfo.additionalInsurance =
        wishListCarInfo.additionalInsurance;
    },
    clearWishList: (state) => {
      state.wishListCarInfo = initialState.wishListCarInfo;
    },
  },
});

// const setBookingItems = (state: any) => {
//   const { bookingCars, taxRate } = state.bookingCarInfo;

//   state.bookingCarInfo.selectedItems = setSelectedItems(bookingCars);
//   state.bookingCarInfo.totalPrice = setTotalPrice(bookingCars);
//   state.bookingCarInfo.tax = setTex(bookingCars, taxRate);

//   state.bookingCarInfo.grandTotal = setGrandTotal(bookingCars, taxRate);
// };

// export const setSelectedItems = (state: any) =>
//   state.reduce((total: number, product: any) => {
//     return Number(total + product.quantity);
//   }, 0);

// export const setTotalPrice = (state: any) =>
//   state.reduce((total: number, product: any) => {
//     return Number(total + product.quantity * product.pricePerHour);
//   }, 0);

// export const setTex = (state: any, taxRate: number) => {
//   return setTotalPrice(state) * taxRate;
// };

// export const setGrandTotal = (state: any, taxRate: number) => {
//   return setTotalPrice(state) + setTex(state, taxRate);
// };

export const { addToWishList, clearWishList } = bookingSlice.actions;

export default bookingSlice.reducer;

export const selectedBooking = (state: RootState) =>
  state.booking.wishListCarInfo;
