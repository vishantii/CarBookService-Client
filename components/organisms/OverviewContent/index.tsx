import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  HistoryTransactionTypes,
  TopUpCategoriesTypes,
} from "../../../services/data-types";
import { getMemberTransactions } from "../../../services/member";
import Categori from "./Categori";
import TableRow from "./TableRow";
import moment from "moment";

export default function OverviewContent() {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  console;

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberTransactions();
    if (response.error) {
      toast.error(response.message);
    } else {
      // setCount(response.data.count);
      setData(response.data);
    }
  }, []);

  useEffect(() => {
    getMemberOverviewAPI();
  }, []);

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">
                    Merek Mobil
                  </th>
                  <th scope="col">Tipe </th>
                  <th scope="col">Tahun </th>
                  <th scope="col">Kilometer</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Nomor Plat</th>
                  <th scope="col">Tanggal </th>
                  <th scope="col">Jam </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <TableRow
                    key={item._id}
                    carBrand={item.carBrand}
                    carType={item.carType}
                    carYear={item.carYear}
                    miles={item.miles}
                    notes={item.notes}
                    licensePlate={item.licensePlate}
                    date={moment(item.chooseDate).format("DD MMMM YYYY")}
                    status={item.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
