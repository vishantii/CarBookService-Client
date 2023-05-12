import moment from "moment";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import cx from "classnames";

const className = {
  label: cx("form-label text-lg fw-medium rounded-pill color-palette-1 mb-10"),
};
const ModalDialog = ({
  isShow,
  hideModal,
  formData,
  onChangeDate,
  onSubmit,
  queue,
}) => {
  return (
    <>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={() => hideModal(false)}>
          <Modal.Title>Form Ubah Jadwal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className={className.label}>Pilih Tanggal Service</label>
            <DatePicker
              minDate={moment().toDate()}
              placeholderText="Pilih Tanggal"
              className="form-select rounded-pill text-lg"
              selected={formData.startDate}
              onChange={(date: any) => {
                onChangeDate(date);
              }}
            />
            <label className="pt-1">{`Jumlah Antrian = ${queue}`}</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hideModal(false)}>
            Cancel
          </Button>
          <Button className="btn btn-sign-up" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDialog;
