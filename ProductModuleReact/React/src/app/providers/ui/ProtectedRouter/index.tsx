import { Navigate, Outlet, useLocation } from "react-router";

import { useSession } from "@/entities/session";

const roles = ["CANDIDATE", "EMPLOYER", "ADMIN"];
interface ProtectedRouterProps {
  allowRole: string
}

export const ProtectedRouter = ({ allowRole }: ProtectedRouterProps) => {
  const { isAuthenticated, role } = useSession();
  const location = useLocation();
  if (allowRole === "ADMIN") return <Outlet />
  if (!isAuthenticated) {
    return <Navigate to={"/dang-nhap"} state={{ from: location }} replace />;
  }
  if (!roles.includes(allowRole) || !role || allowRole.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to={"/dang-nhap"} state={{ from: location }} replace />;
  }
  return <Outlet />
};
