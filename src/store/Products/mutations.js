// export const ADD_REMINDER = (state, newReminder) => {
//   // remove duplicate
//   if (state.reminders.some((reminder) => reminder.id === newReminder.id)) return;
//   state.reminders = [...state.reminders, newReminder];
// };

export const ADD_PRODUCT_TO_CART = (state, newProductId) => {
  // remove duplicate
  // if (state.products.includes(newProductId)) return;
  // state.products.push(newProductId);
  // state.products.find((prod) => prod.id == newProductId);
  const productIndex = state.products.findIndex(
    (product) => product.id == newProductId
  );
  let newArray = [...state.products];
  newArray[productIndex] = { ...newArray[productIndex], isInCart: true };
  state.products = newArray;
};

export const REMOVE_PRODUCT_FROM_CART = (state, productId) => {
  const productIndex = state.products.findIndex(
    (product) => product.id == productId
  );
  let newArray = [...state.products];
  newArray[productIndex] = { ...newArray[productIndex], isInCart: false };
  state.products = newArray;
};

export const SET_LISTED_PRODUCTS = (state, products) => {
  state.products = products;
};
