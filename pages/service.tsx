import Image from "next/image";
import ServiceForm from "../components/organisms/ServiceForm";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, UserTypes } from "../services/data-types";
import {
  getAllCars,
  getServiceCategory,
  getServiceSparepart,
} from "../services/player";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Service({ category, spareparts, cars }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const onService = () => {
    return router.push("/");
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  const modalTutorialCategory = () => {
    return (
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={() => setShowModal(false)}>
          <Modal.Title>PENTING : Panduan memilih kategori servis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Perhatikan kategori servis yang tersedia:<b> Servis Berat </b> dan{" "}
              <b> Servis Ringan. </b>
            </li>
            <br />
            <li>
              Periksa kebutuhan mobil Anda. Jika Anda hanya membutuhkan servis
              rutin seperti pergantian oli mesin, oli gardan, dan pemeriksaan
              kelistrikan, pilihlah kategori servis ringan.
            </li>
            <br />
            <li>
              Jika Anda membutuhkan servis yang melibatkan pergantian parts
              besar, seperti komponen mesin utama, sistem suspensi, atau
              transmisi, pilihlah kategori servis berat.
            </li>
          </ul>
          <p>
            <b>Peringatan:</b> Harap diperhatikan bahwa bengkel tidak
            bertanggung jawab atas kesalahan pemilihan kategori servis yang
            dilakukan oleh pelanggan. Pastikan Anda memilih dengan benar sesuai
            kebutuhan mobil Anda.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {modalTutorialCategory()}
      <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
        <div className="container mx-auto">
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
            setShowModal={setShowModal}
          />
        </div>
      </section>
    </>
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
