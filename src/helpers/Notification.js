import toastrMin from "toastr/build/toastr.min";

export const showNotification = (status, message, duration) => {
  const validStatuses = ["error", "success", "warning", "info"];

  if (!validStatuses.includes(status)) {
    console.warn(
      `Invalid notification status: ${status}. Defaulting to 'error'.`
    );
    status = "error";
  }
  toastrMin.options.timeOut = duration; 
  toastrMin[status](message);
};



// showNotification(
//   "error",
//   "You are not logged in. Please log in to continue.",
//   1100
// );
// setTimeout(() => {
//   navigate("/login");
// }, 1600);