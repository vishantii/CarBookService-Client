import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import Footer from "./Footer";
import MenuItem from "./MenuItem";

interface SideBarProps {
  activeMenu: "overview" | "transactions" | "settings";
}

export default function SideBar(props: SideBarProps) {
  const { activeMenu } = props;
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`sidebar ${
        isMobile ? (isSidebarOpen ? "open" : "closed") : "open"
      }`}
    >
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            title="Transactions"
            icon="ic-menu-transaction"
            active={activeMenu === "transactions"}
            href="/member/transactions"
          />
          {/* <MenuItem
            title="Settings"
            icon="ic-menu-setting"
            active={activeMenu === "settings"}
            href="/member/edit-profile"
          /> */}
          <MenuItem title="Home" icon="ic-menu-card" href="/" />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={onLogOut} />
        </div>
        {/* <Footer /> */}
      </div>
    </section>
  );
}
