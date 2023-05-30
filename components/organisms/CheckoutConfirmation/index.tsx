import { useState } from "react";
import { useRouter } from "next/router";
import { setCheckout } from "../../../services/player";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setShowModal(false);
    setIsLoading(true); // set loading state to true

    const dataItemLocal = localStorage.getItem("service-form");
    const {
      carById,
      miles,
      catById,
      licensePlate,
      date,
      times,
      notes,
      spareparts,
      total,
    } = JSON.parse(dataItemLocal!);

    const data: any = {
      cars: {
        id: carById.id,
        make: carById.make,
        model: carById.model,
        category: carById.category,
        year: carById.year,
      },
      category: {
        id: catById.id,
        name: catById.name,
        price: catById.price,
      },
      miles,
      licensePlate,
      chooseDate: date,
      chooseTime: times,
      notes,
      spareparts,
      total,
    };

    const res = await setCheckout(data);
    if (res?.error) {
      toast.error(res?.message ?? "Boooking slot Full");
      return setIsLoading(false); // set loading state to false
    }
    setIsLoading(false);
    return router.replace("/complete-checkout");
  };

  const setModalPopUp = () => {
    return setShowModal(!showModal);
  };

  const renderModalConfirmation = () => {
    return (
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={() => setShowModal(false)}>
          <Modal.Title>Peraturan Bengkel Terkait Keterlambatan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Setiap pelanggan diwajibkan untuk menyerahkan mobil tepat waktu
              sesuai dengan jadwal yang telah disepakati. Maksimal keterlambatan
              adalah <b> 5 menit. </b>
            </li>
            <br />
            <li>
              Jika pelanggan terlambat lebih dari 5 menit, pihak bengkel akan
              menghubungi pelanggan untuk mengkonfirmasi apakah pelanggan dapat
              tiba di bengkel dalam waktu yang diberikan oleh pihak bengkel
            </li>
            <br />
            <li>
              Jika pelanggan tidak dapat dihubungi dalam waktu yang wajar,
              bengkel berhak untuk membatalkan perjanjian tanpa pemberitahuan
              lebih lanjut.
            </li>
          </ul>
          <br />
          <p>
            Peraturan ini bertujuan untuk menjaga efisiensi pelayanan bengkel
            serta memastikan pengalaman yang adil bagi semua pelanggan. Dengan
            menerapkan peraturan ini, diharapkan dapat meningkatkan kepuasan
            pelanggan dan meminimalkan dampak negatif dari keterlambatan atau
            pembatalan tanpa konfirmasi.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className="btn btn-sign-up" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {renderModalConfirmation()}
      <label className="checkbox-label text-lg color-palette-1">
        Saya konfirmasi data service saya
        <input
          type="checkbox"
          checked={checkbox}
          onChange={() => setCheckBox(!checkbox)}
        />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button
            className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg "
            type="button"
            disabled={!checkbox}
            onClick={setModalPopUp}
          >
            Confirm Transaction
          </button>
        )}
      </div>
    </>
  );
}
