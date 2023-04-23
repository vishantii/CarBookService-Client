import { HistoryTransactionTypes } from "../../../services/data-types";
import Row from "./Row";
import { Rupiah } from "../../../Helpers/convertnumber";
import moment from "moment";

interface TransactionDetailContentProps {
  data: HistoryTransactionTypes;
}
export default function TransactionDetailContent(
  props: TransactionDetailContentProps
) {
  const { data } = props;

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
    return (
      <p className="fw-medium text-start color-palette-3 m-0 position-relative">
        Selesai
      </p>
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
              <div className="purchase pt-30">
                <h2 className="fw-bold text-xl color-palette-1 mb-20">
                  Purchase Details
                </h2>
                <Row label="Merek Mobil" value={data.carBrand} />
                <Row label="Tipe Mobil" value={data.carType} />
                <Row label="Tahun Mobil" value={JSON.stringify(data.carYear)} />
                <Row label="Kilometer" value={JSON.stringify(data.miles)} />
                <Row label="Plat Nomor" value={data.licensePlate} />
                <Row
                  label="Tanggal Servis"
                  value={moment(data.chooseDate).format("DD MMMM YYYY")}
                />
                <Row label="Jam Servis" value={data.chooseTime} />
                <Row label="Tipe Servis" value={data.category.name} />
                <Row
                  label="Total"
                  value={Rupiah(data.category.price)}
                  className="color-palette-4"
                />
              </div>

              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  href="#"
                  role="button"
                >
                  WhatsApp ke Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
