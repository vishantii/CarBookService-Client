import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import TableRow from "./TableRow";
import ButtonTab from "./ButtonTab";
import {
  cancelTransaction,
  getMemberTransactions,
  updateStatusTransaction,
} from "../../../services/member";
import { HistoryTransactionTypes } from "../../../services/data-types";
import moment from "moment";

export default function TransactionContent() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState("all");

  const getMemberTransactionAPI = useCallback(async () => {
    const response = await getMemberTransactions();
    if (response.error) {
      toast.error(response.message);
    } else {
      setTotal(response.data.total);
      setTransactions(response.data);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionAPI();
  }, [getMemberTransactions]);

  const onTabClick = (value: string) => {
    setTab(value);
    getMemberTransactionAPI();
  };

  const onChangeStatus = async (status?: Number, id?: string) => {
    const res = await updateStatusTransaction({ status: status }, id);

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Berhasil Ubah Status");
      getMemberTransactionAPI();
    }
  };

  const onCancelTransaction = async (id: string) => {
    const res = await cancelTransaction({ id: id });

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Berhasil Membatalkan Transaksi");
      getMemberTransactionAPI();
    }
  };

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat
              value={total}
              prefix="Rp. "
              displayType="text"
              thousandSeparator="."
              decimalSeparator=","
            />
          </h3>
        </div>
        {/* <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab
                onClick={() => onTabClick("all")}
                title="All Trx"
                active={tab === "all"}
              />
              <ButtonTab
                onClick={() => onTabClick("success")}
                title="Success"
                active={tab === "success"}
              />
              <ButtonTab
                onClick={() => onTabClick("pending")}
                title="Pending"
                active={tab === "pending"}
              />
              <ButtonTab
                onClick={() => onTabClick("failed")}
                title="Failed"
                active={tab === "failed"}
              />
            </div>
          </div>
        </div> */}
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th scope="col">Tipe Servis </th>
                  <th scope="col">Harga Servis</th>
                  <th scope="col">Nomor Plat</th>
                  <th scope="col">Tanggal </th>
                  <th scope="col">Jam </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((item: HistoryTransactionTypes) => (
                  <TableRow
                    key={item._id}
                    id={item._id}
                    category={item.category}
                    licensePlate={item.licensePlate}
                    date={moment(item.chooseDate).format("DD MMMM YYYY")}
                    times={item.chooseTime}
                    status={item.status}
                    onChangeStatus={onChangeStatus}
                    cancelTransaction={onCancelTransaction}
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
