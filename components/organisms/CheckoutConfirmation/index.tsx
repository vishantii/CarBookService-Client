import { useState } from "react";
import { useRouter } from "next/router";
import { setCheckout, setTimeUpdate } from "../../../services/player";
import {
  CheckoutTypes,
  TimeDataUpdateTypes,
} from "../../../services/data-types";

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    const dataItemLocal = localStorage.getItem("service-form");

    const dataItem = JSON.parse(dataItemLocal!);

    const data: CheckoutTypes = {
      carBrand: dataItem.carBrand,
      carType: dataItem.carType,
      carYear: dataItem.carYear,
      miles: dataItem.miles,
      category: {
        id: dataItem.catById.id,
        name: dataItem.catById.name,
        price: dataItem.catById.price,
      },
      licensePlate: dataItem.licensePlate,
      chooseDate: dataItem.date,
      chooseTime: dataItem.times,
      notes: dataItem.notes,
    };

    const timeDataUpdate: TimeDataUpdateTypes = {
      date: dataItem.date,
      time: dataItem.times,
    };

    Promise.all([setTimeUpdate(timeDataUpdate), setCheckout(data)]).then(() => {
      router.push("/complete-checkout");
    });
  };
  return (
    <>
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
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          disabled={!checkbox}
          onClick={onSubmit}
        >
          Confirm Transaction
        </button>
      </div>
    </>
  );
}
