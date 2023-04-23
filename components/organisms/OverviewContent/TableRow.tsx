import cx from "classnames";
import NumberFormat from "react-number-format";

interface TableRowProps {
  carBrand: string;
  carType: string;
  carYear: string;
  price: number;
  status: number;
  date: string;
  licensePlate: string;
  notes: string;
  times: string;
  miles: string;
  category: Object;
}
export default function TableRow(props: TableRowProps) {
  const {
    carBrand,
    carType,
    carYear,
    category,
    date,
    licensePlate,
    miles,
    notes,
    times,
    status,
  } = props;
  const statusClass = cx({
    "float-start icon-status": true,
    pending: status === 1,
    success: status === 2,
    failed: status === 3,
  });
  const statusDesc = (status: number) => {
    if (status === 1) {
      return (
        <p className="fw-medium text-start color-palette-1 m-0 position-relative">
          Pending
        </p>
      );
    }
    if (status === 2) {
      return (
        <p className="fw-medium text-start color-palette-2 m-0 position-relative">
          Konfirmasi Checkin
        </p>
      );
    }
    return (
      <p className="fw-medium text-start color-palette-3 m-0 position-relative">
        Konfirmasi Checkout
      </p>
    );
  };
  return (
    <tr className="align-middle">
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{carBrand}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{carType}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{carYear}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{miles}</p>
      </td>
      <td>
        <p className="fw-medium text-start color-palette-1 m-0">{notes}</p>
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
          <span className={statusClass} />
          <p className="fw-medium text-start color-palette-1 m-0 position-relative">
            {statusDesc(status)}
          </p>
        </div>
      </td>
    </tr>
  );
}
