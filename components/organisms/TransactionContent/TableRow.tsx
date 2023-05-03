import Link from "next/link";
import cx from "classnames";
import { Rupiah } from "../../../Helpers/convertnumber";

interface TableRowProps {
  carBrand: string;
  carType: string;
  carYear: string;
  price: number;
  status: number | any;
  date: string;
  licensePlate: string;
  notes: string;
  times: string;
  miles: string;
  category: Object | any;
  id: string;
  onChangeStatus: any;
  cancelTransaction: any;
  setShowModal: any;
  setTempData: any;
}
export default function TableRow(props: any) {
  const {
    date,
    licensePlate,
    times,
    status,
    category,
    id,
    onChangeStatus,
    setShowModal,
    setTempData,
  } = props;

  // const statusClass = cx({
  //   "float-start icon-status": true,
  //   pending: status === 0,
  //   checkin: status === 1,
  //   confirmCheckin: status === 2,
  //   checkout: status === 3,
  // });
  const statusDesc = (status: number) => {
    if (status === 0) {
      return (
        <>
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-status rounded-pill text-xs"
            onClick={() => onChangeStatus(4, id)}
          >
            Batalkan
          </button>
          <br />
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            className="btn btn-status rounded-pill text-xs"
            onClick={() => {
              setTempData(id);
              setShowModal(true);
            }}
          >
            Ubah Jadwal
          </button>
        </>
      );
    }
    if (status === 1) {
      return (
        <button
          className="btn btn-status rounded-pill text-xs"
          onClick={() => onChangeStatus(2, id)}
        >
          Konfirmasi Checkin
        </button>
      );
    }
    if (status === 2) {
      return (
        <p className="fw-small text-start color-palette-3 m-0 position-relative">
          Service <br />
          Sedang <br />
          Berlangsung
        </p>
      );
    }
    if (status === 4) {
      return (
        <p className="fw-small text-start color-palette-3 m-0 position-relative">
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

  return (
    <>
      <tr data-category="pending" className="align-middle">
        <td>
          <p className="fw-medium text-start color-palette-1 m-0">
            {category.name}
          </p>
        </td>
        <td>
          <p className="fw-medium text-start color-palette-1 m-0">
            {Rupiah(category.price)}
          </p>
        </td>
        <td>
          <p className="fw-medium text-start color-palette-1 m-0">
            {licensePlate}
          </p>
        </td>

        <td>
          <p className="fw-medium text-start color-palette-1 m-0">{date}</p>
        </td>
        <td>
          <p className="fw-medium text-start color-palette-1 m-0">{times}</p>
        </td>
        <td>
          <div>
            {/* <span className={statusClass} /> */}
            <p className="fw-medium text-start color-palette-1 m-0 position-relative">
              {statusDesc(status)}
            </p>
          </div>
        </td>
        <td>
          <Link href={{ pathname: `/member/transactions/${id}` }}>
            <button className="btn btn-status rounded-pill text-sm">
              Details
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
}
