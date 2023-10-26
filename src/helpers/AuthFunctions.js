import toastrMin from "toastr/build/toastr.min";

//log out function
export const logOutUser = () => {
  localStorage.removeItem("cart");
  toastrMin.success("User logged out");
};
