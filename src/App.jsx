import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ForgetPass from "./AuthModule/Components/ForgetPass/ForgetPass";
import Login from "./AuthModule/Components/Login/Login";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import Home from "./HomeModule/Components/Home/Home";
import RecipesList from "./RecipesModule/Components/RecipesList/RecipesList";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import UsersList from "./UsersModule/Components/UsersList/UsersList";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/Components/ProtectedRoute/ProtectedRoute";

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
  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
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
        { path: "forget-pass", element: <ForgetPass /> },
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
