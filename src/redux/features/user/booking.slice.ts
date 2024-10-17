import { TypeOfUpdateQuantity } from "@/constant/manageCar";
import { RootState } from "@/redux/store";
import { TCar } from "@/tyeps";
import { createSlice } from "@reduxjs/toolkit";

type TBookingState = {
  wishListCarInfo: {
    wishCar: TCar | undefined;
    location: string;
    pickUpDate: string;
    dropOffDate: string;
    additionalOptions: [];
  };
  bookingCarInfo: {
    bookingCars: TCar[];
    selectedItems: number;
    totalPrice: number;
    tax: number;
    taxRate: number;
    grandTotal: number;
    location: string;
    pickUpDate: string;
    dropOffDate: string;
  };
};

const initialState: TBookingState = {
  wishListCarInfo: {
    wishCar: undefined,
    location: "",
    pickUpDate: "",
    dropOffDate: "",
    additionalOptions: [],
  },
  bookingCarInfo: {
    bookingCars: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.1,
    grandTotal: 0,
    location: "",
    pickUpDate: "",
    dropOffDate: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addToBookingList: (state, action) => {
      const { bookingCarInfo } = action.payload;

      const isExist = state.bookingCarInfo.bookingCars.find(
        (car) => car._id === bookingCarInfo._id
      );

      if (!isExist) {
        state.bookingCarInfo.bookingCars.push({
          ...bookingCarInfo,
          quantity: 1,
        });
      }

      setBookingItems(state);
    },
    updateQuantityToBookingList: (state, action) => {
      state.bookingCarInfo.bookingCars.map((bookingCar: any) => {
        if (bookingCar._id === action.payload._id) {
          if (action.payload.type === TypeOfUpdateQuantity.increment) {
            bookingCar.quantity += 1;
          } else if (action.payload.type === TypeOfUpdateQuantity.decrement) {
            bookingCar.quantity -= 1;
          }
        }
        return bookingCar;
      });

      setBookingItems(state);
    },
    addToWishList: (state, action) => {
      const { wishListCarInfo } = action.payload;
      console.log(state, wishListCarInfo);
    },
    clearBookingInfo: () => {
      initialState;
    },
  },
});

const setBookingItems = (state: any) => {
  const { bookingCars, taxRate } = state.bookingCarInfo;

  state.bookingCarInfo.selectedItems = setSelectedItems(bookingCars);
  state.bookingCarInfo.totalPrice = setTotalPrice(bookingCars);
  state.bookingCarInfo.tax = setTex(bookingCars, taxRate);

  state.bookingCarInfo.grandTotal = setGrandTotal(bookingCars, taxRate);
};

export const setSelectedItems = (state: any) =>
  state.reduce((total: number, product: any) => {
    return Number(total + product.quantity);
  }, 0);

export const setTotalPrice = (state: any) =>
  state.reduce((total: number, product: any) => {
    return Number(total + product.quantity * product.pricePerHour);
  }, 0);

export const setTex = (state: any, taxRate: number) => {
  return setTotalPrice(state) * taxRate;
};

export const setGrandTotal = (state: any, taxRate: number) => {
  return setTotalPrice(state) + setTex(state, taxRate);
};

export const {
  addToBookingList,
  updateQuantityToBookingList,
  addToWishList,
  clearBookingInfo,
} = bookingSlice.actions;

export default bookingSlice.reducer;

export const selectedBooking = (state: RootState) => state.booking;
