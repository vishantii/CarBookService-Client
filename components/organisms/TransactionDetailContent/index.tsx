import { HistoryTransactionTypes } from "../../../services/data-types";
import moment from "moment";
import NumberFormat from "react-number-format";
import { setInvoice } from "../../../services/player";

interface TransactionDetailContentProps {
  data: HistoryTransactionTypes;
}
export default function TransactionDetailContent(props: any) {
  const { data } = props;

  const onGenerateInvoice = async () => {
    try {
      await setInvoice(data);
    } catch (error) {
      console.log(error);
    }
  };

  const statusDesc = (status: Number) => {
    if (status === 0) {
      return (
        <p className="fw-medium text-start color-palette-1 m-0 position-relative">
          Pesan
        </p>
      );
    }
    if (status === 1) {
      return (
        <p className="fw-medium text-start color-palette-2 m-0 position-relative">
          Konfirmasi Checkin
        </p>
      );
    }
    if (status === 2) {
      return (
        <p className="fw-medium text-start color-palette-2 m-0 position-relative">
          Konfirmasi Checkout
        </p>
      );
    }
    if (status === 4) {
      return (
        <p className="fw-medium text-start color-palette-2 m-0 position-relative">
          Canceled
        </p>
      );
    }
    return (
      <p className="fw-medium text-start color-palette-3 m-0 position-relative">
        Selesai
      </p>
    );
  };
  const renderSparepartList = () => {
    return (
      <div className="sparepart pt-50">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Detail Service
        </h2>
        {data.spareparts.map((sparepart) => (
          <p key={sparepart._id} className="text-lg color-palette-1 mb-20">
            {sparepart.sparepartId.name} x {sparepart.quantity}{" "}
            <span className="purchase-details">
              <NumberFormat
                value={sparepart.sparepartId.price * sparepart.quantity}
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
              value={data.category.price}
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
            {moment(data.date).format("DD MMMM YYYY")}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Jam Servis
          <span className="purchase-details">{data.chooseTime}</span>
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
              value={data.total}
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
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Details #{data.bookingNumber}
        </h2>
        <div className="details">
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                <div className="game-checkout d-flex flex-row align-items-center">
                  <p className="fw-bold">Status</p>
                </div>
                <div>
                  <p className="fw-medium pending rounded-pill">
                    {statusDesc(data.status)}
                  </p>
                </div>
              </div>
              <hr />
              <>
                <div className="purchase pt-md-50 pt-30">
                  <h2 className="fw-bold text-xl color-palette-1 mb-20">
                    Detail Kendaraan
                  </h2>
                  <p className="text-lg color-palette-1 mb-20">
                    Merk Mobil
                    <span className="purchase-details">{data.carBrand}</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Tipe Mobil{" "}
                    <span className="purchase-details">{data.carType}</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Tahun Mobil
                    <span className="purchase-details">{data.carYear}</span>
                  </p>

                  <p className="text-lg color-palette-1 mb-20">
                    Keluhan
                    <span className="purchase-details">{data.notes}</span>
                  </p>
                  {renderServiceSchedule()}
                  {renderSparepartList()}
                  {renderTotal()}
                </div>
              </>

              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  href="#"
                  role="button"
                >
                  WhatsApp ke Admin
                </a>
              </div>
              <div className="d-md-block d-flex flex-column w-100 pt-4">
                <button
                  onClick={onGenerateInvoice}
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  role="button"
                >
                  Download Invoice
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
