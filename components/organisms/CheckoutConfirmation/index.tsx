import { useState } from "react";
import { useRouter } from "next/router";
import { setCheckout, setTimeUpdate } from "../../../services/player";
import {
  CheckoutTypes,
  TimeDataUpdateTypes,
} from "../../../services/data-types";

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
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

    const timeDataUpdate: TimeDataUpdateTypes = {
      date,
      time: times,
    };

    try {
      await Promise.all([
        setTimeUpdate(timeDataUpdate),
        setCheckout(data),
      ]).then((res) => {
        if (res) {
          return router.replace("/complete-checkout");
        }
      });
    } catch (error) {
      console.error(error);
      // handle error
    } finally {
      setIsLoading(false); // set loading state to false
    }
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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <button
            className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg "
            type="button"
            disabled={!checkbox}
            onClick={onSubmit}
          >
            Confirm Transaction
          </button>
        )}
      </div>
    </>
  );
}
