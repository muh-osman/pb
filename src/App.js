//React router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Pages & Components
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogoIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Edit from "./pages/Dashboard/Edit/Edit";
import Add from "./pages/Dashboard/Add/Add";
// Utils
import Auth from "./utils/Auth";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />} />

        <Route element={<Auth />}>
          {/* Start protected route */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Edit />} />
            <Route path="add" element={<Add />} />
          </Route>
          {/* End protected route */}
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
