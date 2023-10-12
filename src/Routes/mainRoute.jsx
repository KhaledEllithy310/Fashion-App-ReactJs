import { createBrowserRouter } from "react-router-dom";

import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

export const router = createBrowserRouter([userRoutes, adminRoutes]);
