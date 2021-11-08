export function getProducts(state) {
  if (!state.products) {
    return null;
  } else {
    state.products.forEach((product) => {
      if (!product.product_tags) {
        product.product_tags = ["dummy", "variable"];
      }
    });
    return state.products;
  }
}

export function getProductsInCart(state) {
  if (!state.products) {
    return null;
  } else {
    return state.products.filter((prod) => prod.isInCart === true);
  }
}

export function getTotalCart(state) {
  if (!state.products) {
    return null;
  } else {
    const inCartProducts = state.products.filter(
      (prod) => prod.isInCart === true
    );
    const cart = {};
    cart.price = 0;
    cart.description = "";
    inCartProducts.forEach((product) => {
      cart.price = cart.price + product.product_price * product.quantity;
      cart.description = cart.description.concat(product.name + "; ");
    });
    cart.price = Math.round(cart.price);
    return cart;
  }
}
