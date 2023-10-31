import toastrMin from "toastr/build/toastr.min";

//log out function
export const logOutUser = () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("wishList");
  toastrMin.success("User logged out");
};
