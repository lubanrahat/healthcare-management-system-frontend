import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navetems"
import { getUserInfo } from "@/services/auth.services"
import { NavSection } from "@/types/dashboard.types"

export default async function DashboardSidebar() {

    const userInfo = await getUserInfo();

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role)

    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    

    return (
        <div>
            Dashboard Sidebar
        </div>
    )
}