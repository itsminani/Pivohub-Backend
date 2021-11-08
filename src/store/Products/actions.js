import { API } from "aws-amplify";
import { listProducts } from "@/graphql/queries.js";

export const addProductToCartAction = async ({ commit }, newProductId) => {
  commit("ADD_PRODUCT_TO_CART", newProductId);
};

export const removeProductFromCartAction = async ({ commit }, productId) => {
  commit("REMOVE_PRODUCT_FROM_CART", productId);
};

export const listProductsAction = async ({ commit }, filter) => {
  try {
    const products = await API.graphql({
      query: listProducts,
      variables: filter,
    });
    // console.log(products.data.listProducts.items);
    products.data.listProducts.items.forEach((product) => {
      product.quantity = 1;
    });
    commit("SET_LISTED_PRODUCTS", products.data.listProducts.items);
  } catch (err) {
    console.log(err);
  }
};

// export const listRemindersAction = async ({ commit }) => {
//   // const futureDate = date.formatDate(new Date(2100, 1, 1), "YYYY/MM/DD");
//   // const currentDate = date.formatDate(new Date(), "YYYY/MM/DD");
//   // const twoDaysPriorDate = date.formatDate(
//   //   date.formatDate(date.subtractFromDate(new Date(), { days: 2 })),
//   //   "YYYY/MM/DD"
//   // );
//   // const inTwoDaysDate = date.formatDate(
//   //   date.formatDate(date.addToDate(new Date(), { days: 2 })),
//   //   "YYYY/MM/DD"
//   // );
//   const filter = {};
//   filter.reminder_status = "TEST";
//   // filter.due_date = {
//   //   between: [currentDate, futureDate],
//   // };
//   try {
//     const reminders = await API.graphql({
//       query: reminderByStatusByDueDate,
//       variables: filter,
//     });
//     console.log(reminders.data.reminderByStatusByDueDate.items);
//     commit("SET_LISTED_REMINDERS", reminders.data.reminderByStatusByDueDate.items);
//     Notify.create({
//       message: "Successfully fetched reminders",
//       color: "green",
//     });
//   } catch (err) {
//     console.log(err);
//     Notify.create({
//       message: "Whoops, something went wrong.",
//       color: "red",
//     });
//   }
// };

// // eslint-disable-next-line no-unused-vars
// export const updateReminderAction = async ({ commit },reminder) => {
//   // Adding one day to the date and pushing to amplify
//   try {
//     const updateResp = await API.graphql({
//       query: updateReminder,
//       variables: { input: reminder },
//     });
//     console.log(updateResp);
//     Notify.create({
//       message: "Successfully added 1 day to your reminder",
//       color: "green",
//     });
//   } catch (error) {
//     console.log(error);
//     Notify.create({
//       message: "Something went wrong. Please contact admin.",
//       color: "red",
//     });
//   }
// }

// export const setRemindersAction = async ({ commit }, reminders) => {
//   // If there are reminders
//   if (reminders.items) {
//     commit("SET_LISTED_REMINDERS", reminders.items);
//   } else {
//     commit("SET_LISTED_REMINDERS", []);
//   }
// };
