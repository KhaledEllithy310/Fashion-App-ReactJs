import {
  createBrowserRouter,
  // createRoutesFromElements,
  // Route,
} from "react-router-dom";

import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     //  <Route path="/" element={<Root />}>
//     // <Route path="/" element={<Home />}>
//     //   <Route path="dashboard" element={<Dashboard />} />
//     // </Route>
//           <Route path="dashboard" element={<Dashboard />} />

//   )
// );

export const router = createBrowserRouter([userRoutes, adminRoutes]);
