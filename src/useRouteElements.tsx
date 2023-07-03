import { useContext } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

import { AppContext } from "./contexts/app.context"
import path from "./constants/path"

import ProductList from "./pages/ProductList"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterLayout from "./layouts/RegisterLayout"
import MainLayout from "./layouts/MainLayout"
import Profile from "./pages/Profile"

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "profile",
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "login",
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: "register",
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
