import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableRow from "./TableRow";
import {
  changeSchedule,
  getMemberTransactions,
  updateStatusTransaction,
} from "../../../services/member";
import { HistoryTransactionTypes } from "../../../services/data-types";
import moment from "moment";
import ModalDialog from "../../molecules/Modal";
import { getServiceTime } from "../../../services/player";
import _ from "lodash";

export default function TransactionContent() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    time: [],
    times: "",
  });
  const [tempData, setTempData] = useState("");
  const timeCheck = _.isEmpty(formData.time);

  const [tab, setTab] = useState("all");

  const getMemberTransactionAPI = useCallback(async () => {
    const response = await getMemberTransactions();
    if (response.error) {
      toast.error(response.message);
    } else {
      setTransactions(response.data);
    }
  }, []);

  console.log("trans-->", transactions);

  useEffect(() => {
    getMemberTransactionAPI();
  }, [getMemberTransactions]);

  // const onTabClick = (value: string) => {
  //   setTab(value);
  //   getMemberTransactionAPI();
  // };

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
      time: [], // Clear the time array when the date changes
    }));
    const convertDate = moment(dates).format("YYYY-MM-DD");
    const res = await getServiceTime({ date: convertDate });
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: res.data,
    }));
  };

  const onChangeSchedule = async () => {
    const data: any = {
      serviceId: tempData,
      date: moment(formData.startDate).format("YYYY-MM-DD"),
      time: formData.times,
    };
    const res = await changeSchedule(data, tempData);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Berhasil Ubah Jadwal");
      getMemberTransactionAPI();
      setShowModal(false);
    }
    console.log(data);
  };

  const renderModal = () => {
    return (
      <ModalDialog
        isShow={showModal}
        hideModal={setShowModal}
        timeCheck={timeCheck}
        formData={formData}
        onChangeDate={onChangeDate}
        setFormData={setFormData}
        onSubmit={onChangeSchedule}
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
                {transactions.map((item: HistoryTransactionTypes) => {
                  return (
                    <TableRow
                      key={item._id}
                      id={item._id}
                      category={item.category}
                      licensePlate={item.licensePlate}
                      date={moment(item.chooseDate).format("DD MMMM YYYY")}
                      times={item.chooseTime}
                      status={item.status}
                      onChangeStatus={onChangeStatus}
                      setShowModal={setShowModal}
                      setTempData={setTempData}
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
