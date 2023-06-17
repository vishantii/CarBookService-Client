import jwtDecode from "jwt-decode";
import SideBar from "../../components/organisms/SideBar";
import OverviewContent from "../../components/organisms/OverviewContent";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { useState } from "react";

export default function Member() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <section className="overview overflow-auto">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeMenu="overview"
      />
      <OverviewContent />
    </section>
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

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.customer;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
