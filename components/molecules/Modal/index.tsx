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
  timeCheck,
  formData,
  onChangeDate,
  setFormData,
  onSubmit,
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
          </div>
          {!timeCheck ? (
            <div className="pt-30">
              <label className={className.label}>Waktu Service</label>
              <select
                name="times"
                id="times"
                className="form-control rounded-pill text-lg category-select p-3"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    times: event.target.value,
                  });
                }}
              >
                <option value="">Select Time</option>
                {formData.time.map((time: any) => (
                  <option key={time.id} value={time.time}>
                    {time.available && time.time}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hideModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDialog;
