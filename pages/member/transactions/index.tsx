import { useState } from "react";
import SideBar from "../../../components/organisms/SideBar";
import TransactionContent from "../../../components/organisms/TransactionContent";

export default function Transactions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="toggle-sidebar-container">
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="badge bg-warning d-flex align-items-center justify-content-center toggle-sidebar"
        >
          toggle sidebar
        </div>
      </div>
      <section className="transactions overflow-auto">
        <SideBar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          activeMenu="transactions"
        />

        <TransactionContent />
      </section>
    </>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
