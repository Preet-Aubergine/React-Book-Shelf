import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Search from "../pages/Search";
import Favourite from "../pages/Favourite";
import Profile from "../pages/Profile";
import Current from "../pages/Current";
import Finished from "../pages/Finished";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    toast.error("Please login to access this page", {
      duration: 3000,
      style: {
        background: "#f44336",
        color: "#fff",
      },
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export const protectedRoutes = [
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/favourites",
    element: (
      <ProtectedRoute>
        <Favourite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/current",
    element: (
      <ProtectedRoute>
        <Current />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/finished",
    element: (
      <ProtectedRoute>
        <Finished />
      </ProtectedRoute>
    ),
  },
];
