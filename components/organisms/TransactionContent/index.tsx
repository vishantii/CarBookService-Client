import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableRow from "./TableRow";
import {
  changeSchedule,
  getMemberTransactions,
  getQueue,
  updateStatusTransaction,
} from "../../../services/member";
import { HistoryTransactionTypes } from "../../../services/data-types";
import moment from "moment";
import ModalDialog from "../../molecules/Modal";
import _ from "lodash";

export default function TransactionContent() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    queue: 0,
  });
  const [tempData, setTempData] = useState("");
  const [category, setCategory] = useState({});
  const currentDate = moment();

  const getMemberTransactionAPI = useCallback(async () => {
    const response = await getMemberTransactions();
    if (response.error) {
      toast.error(response.message);
    } else {
      setTransactions(response.data);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionAPI();
  }, [getMemberTransactions]);

  const onChangeStatus = async (status?: any, id?: any) => {
    const res = await updateStatusTransaction({ status: status }, id);

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Berhasil Ubah Status");
      getMemberTransactionAPI();
    }
  };

  const onChangeDate = async (dates: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: dates,
    }));
    const convertDate = moment(dates).format("YYYY-MM-DD");
    const res = await getQueue({ chooseDate: convertDate, category });
    setFormData((prevFormData) => ({
      ...prevFormData,
      queue: res.data.data,
    }));
  };

  const onChangeSchedule = async () => {
    const data: any = {
      newDate: moment(formData.startDate).format("YYYY-MM-DD"),
    };
    const res = await changeSchedule(data, tempData);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Berhasil Ubah Jadwal");
      getMemberTransactionAPI();
      setShowModal(false);
    }
  };

  const renderModal = () => {
    return (
      <ModalDialog
        isShow={showModal}
        hideModal={setShowModal}
        formData={formData}
        onChangeDate={onChangeDate}
        onSubmit={onChangeSchedule}
        queue={formData.queue}
      />
    );
  };

  return (
    <main className="main-wrapper">
      {renderModal()}
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Transactions
        </h2>
        <div className="latest-transaction">
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th scope="col">Tipe Servis </th>
                  <th scope="col">Harga Servis</th>
                  <th scope="col">Nomor Plat</th>
                  <th scope="col">Tanggal </th>
                  <th scope="col">Antrian Ke </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {transactions.map((item: HistoryTransactionTypes) => {
                  return (
                    <TableRow
                      key={item._id}
                      id={item._id}
                      category={item.category}
                      licensePlate={item.licensePlate}
                      date={moment(item.chooseDate).format("DD MMMM YYYY")}
                      queue={item.queueNumber}
                      status={item.status}
                      onChangeStatus={onChangeStatus}
                      setShowModal={setShowModal}
                      setTempData={setTempData}
                      setCategory={setCategory}
                      currentDate={currentDate}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
