import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import ChangePass from "./AuthModule/Components/ChangePass/ChangePass";
import Login from "./AuthModule/Components/Login/Login";
import ResetPassRequest from "./AuthModule/Components/ResetPassRequest/ResetPassRequest";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import Home from "./HomeModule/Components/Home/Home";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import ProtectedRoute from "./SharedModule/Components/ProtectedRoute/ProtectedRoute";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";

function App() {
  const [adminData, setAdminData] = useState(null);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);
  const routes = createHashRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home adminData={adminData}/> },
        { path: "users", element: <UsersList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "reset-pass-request", element: <ResetPassRequest /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
