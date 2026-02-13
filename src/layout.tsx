import NavBar from "./components/nav-bar/navBar"
import { TabBar } from "./components/tabbar/tabBar"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <NavBar/>
        <TabBar/>
        {children}
        </>
    )
}