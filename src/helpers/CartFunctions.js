//calculate total price
export const calculateTotalPrice = (state) => {
  state.totalPrice = 0;
  state.cart?.productsCart.forEach((product) => {
    const { price, discountPercentage, quantity } = product;
    state.totalPrice += ((price * (100 - discountPercentage)) / 100) * quantity;
    console.log(" state.totalPrice", state.totalPrice);
  });
};

//store the cart in local storage
export const storeInLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

//calculate total Items
export const calculateTotalItems = (state) => {
  state.totalItems = 0;
  state.cart?.productsCart.forEach((product) => {
    const { quantity } = product;
    state.totalItems += quantity;
    console.log(" state.totalItems", state.totalItems);
  });
};
