import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Profile from "./Profile";
import MenuItem from "./MenuItem";
import { useEffect } from "react";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
}

export default function SideBar(props: any) {
  const { activeMenu, setIsSidebarOpen, isSidebarOpen } = props;
  const router = useRouter();

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={`sidebar ${isSidebarOpen ? "show" : "hide"}`}>
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Transactions"
            icon="ic-menu-transaction"
            active={activeMenu === "transactions"}
            href="/member/transactions"
          />
          <MenuItem
            title="Edit Profile"
            icon="ic-menu-setting"
            active={activeMenu === "settings"}
            href="/member/edit-profile"
          />
          <MenuItem title="Home" icon="ic-menu-card" href="/" />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogOut} />
        </div>
      </div>
    </section>
  );
}
