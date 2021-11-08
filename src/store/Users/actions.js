import { Auth } from "aws-amplify";

export const initialize = async ({ commit }) => {
  // Fetch the current user only
  try {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = await Auth.currentAuthenticatedUser();
    console.log(user);
    console.log(attributes);
    commit("SET_USER_SELF", user);
  } catch (error) {
    console.log(error);
  }
};
