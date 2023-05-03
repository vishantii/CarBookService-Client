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
    spareparts: [],
    total: "",
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("service-form");
    const dataTopUpLocal = JSON.parse(dataFromLocal!);
    setDataService(dataTopUpLocal);
  }, []);

  const itemPrice = parseInt(dataService.catById.price);

  const renderSparepartList = () => {
    return (
      <div className="sparepart pt-50">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Detail Service
        </h2>
        {dataService.spareparts.map((sparepart: any) => (
          <p key={sparepart._id} className="text-lg color-palette-1 mb-20">
            {sparepart.name} x {sparepart.quantity}{" "}
            <span className="purchase-details">
              <NumberFormat
                value={sparepart.price * sparepart.quantity}
                prefix="Rp. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </span>
          </p>
        ))}
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
      </div>
    );
  };

  const renderServiceSchedule = () => {
    return (
      <div className="sparepart pt-50">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Jadwal Service
        </h2>
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
      </div>
    );
  };

  const renderTotal = () => {
    return (
      <div className="sparepart pt-50">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Total Biaya</h2>
        <p className="text-lg color-palette-1 mb-20">
          Total{" "}
          <span className="purchase-details color-palette-4">
            <NumberFormat
              value={dataService.total}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </span>
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Detail Kendaraan
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
          Keluhan
          <span className="purchase-details">{dataService.notes}</span>
        </p>
        {renderServiceSchedule()}
        {renderSparepartList()}
        {renderTotal()}
      </div>
    </>
  );
}
