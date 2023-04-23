import moment from "moment";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

export default function CheckoutDetail() {
  const [dataService, setDataService] = useState({
    carBrand: "",
    carType: "",
    carYear: "",
    catById: {
      id: "",
      name: "",
      price: "",
    },
    date: "",
    licensePlate: "",
    miles: "",
    notes: "",
    times: "",
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("service-form");
    const dataTopUpLocal = JSON.parse(dataFromLocal!);
    setDataService(dataTopUpLocal);
  }, []);

  const itemPrice = parseInt(dataService.catById.price);
  const tax = parseInt(dataService.catById.price) * (10 / 100);
  const totalPrice = itemPrice + tax;
  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Purchase Details
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Merk Mobil
          <span className="purchase-details">{dataService.carBrand}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tipe Mobil{" "}
          <span className="purchase-details">{dataService.carType}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tahun Mobil
          <span className="purchase-details">{dataService.carYear}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tanggal Servis
          <span className="purchase-details">
            {moment(dataService.date).format("DD MMMM YYYY")}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Jam Servis
          <span className="purchase-details">{dataService.times}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Keluhan
          <span className="purchase-details">{dataService.notes}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Biaya Service{" "}
          <span className="purchase-details">
            <NumberFormat
              value={itemPrice}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%){" "}
          <span className="purchase-details">
            <NumberFormat
              value={tax}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total{" "}
          <span className="purchase-details color-palette-4">
            <NumberFormat
              value={totalPrice}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
      </div>
    </>
  );
}
