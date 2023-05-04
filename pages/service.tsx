import Image from "next/image";
import Link from "next/link";
import ServiceForm from "../components/organisms/ServiceForm";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, UserTypes } from "../services/data-types";
import {
  getAllCars,
  getServiceCategory,
  getServiceSparepart,
} from "../services/player";
import { useRouter } from "next/router";

export default function Service({ category, spareparts, cars }) {
  const router = useRouter();
  const onService = () => {
    return router.push("/");
  };
  return (
    <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
      <div className="container mx-auto">
        <form action="">
          <div className="pb-50">
            <a href="/" className="text-center" onClick={onService}>
              <Image
                alt="logo"
                src="/icon/construction.png"
                width={60}
                height={60}
              />
            </a>
          </div>
          <ServiceForm
            categoryData={category}
            sparepartData={spareparts}
            carsData={cars}
          />
        </form>
      </div>
    </section>
  );
}

export async function getServerSideProps({ req }) {
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
  const dataCategory = await getServiceCategory();
  const dataSparepart = await getServiceSparepart();
  const dataCars = await getAllCars();
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
      category: dataCategory.data,
      spareparts: dataSparepart.data,
      cars: dataCars.data,
    },
  };
}
