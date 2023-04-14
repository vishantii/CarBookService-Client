import { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { CategoryTypes } from "../../../services/data-types";
import { getServiceCategory, getServiceTime } from "../../../services/player";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

export default function ServiceForm() {
  const [carBrand, setCarBrand] = useState("");
  const [carType, setCarType] = useState("");
  const [carYear, setCarYear] = useState("");
  const [miles, setMiles] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [time, setTime] = useState([]);
  const [times, setTimes] = useState("");
  const [notes, setNotes] = useState("");
  const [catService, setCatService] = useState("");
  const [categories, setCategories] = useState([]);
  const timeCheck = _.isEmpty(time);

  const router = useRouter();
  const className = {
    label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
  };

  const getServiceCategoryAPI = useCallback(async () => {
    const data = await getServiceCategory();

    setCategories(data);
  }, [getServiceCategory]);

  const onChangeDate = async (dates: any) => {
    setStartDate(dates);
    const convertDate = moment(dates).format("YYYY-MM-DD");
    await getServiceTime({
      date: convertDate,
    }).then((res) => {
      setTime(res.data);
    });
  };

  useEffect(() => {
    getServiceCategoryAPI();
  }, []);

  const onSubmit = () => {
    // const data = new FormData();
    // data.append("carBrand", carBrand);
    // data.append("carType", carType);
    // data.append("carYear", carYear);
    // data.append("miles", miles);
    // data.append("time", times);
    // data.append("licensePlate", licensePlate);
    // data.append("date", startDate);
    // data.append("category", catService);
    // data.append("notes", notes);
    const date = moment(startDate).format("YYYY-MM-DD");
    const userForm = {
      carBrand,
      carType,
      carYear,
      miles,
      licensePlate,
      date,
      times,
      notes,
      catService,
    };

    localStorage.setItem("service-form", JSON.stringify(userForm));
    console.log("userForm-->", userForm);
    router.push("/checkout");
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Service Form</h2>
      <div className="pt-50">
        <label className={className.label}>Merek Mobil</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your Car Brand"
          value={carBrand}
          onChange={(event) => setCarBrand(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Tipe Mobil</label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          placeholder="Enter your Car Type"
          value={carType}
          onChange={(event) => setCarType(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Tahun Mobil</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Enter Car Year"
          value={carYear}
          onChange={(event) => setCarYear(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Jumlah Kilometer</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Total Miles"
          value={miles}
          onChange={(event) => setMiles(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Nomor Plat Mobil</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Your Plate License"
          value={licensePlate}
          onChange={(event) => setLicensePlate(event.target.value)}
        />
      </div>
      <div className="pt-30">
        <label htmlFor="category" className={className.label}>
          Kategori Servis
        </label>
        <select
          id="category"
          name="category"
          className="form-select rounded-pill text-lg p-3"
          aria-label="Service Category"
          value={catService}
          onChange={(event) => setCatService(event.target.value)}
        >
          {categories.map((category: CategoryTypes) => (
            <option key={category._id} value={category._id} selected>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-30">
        <label className={className.label}>Pilih Tanggal Service</label>
        <DatePicker
          minDate={moment().toDate()}
          className="form-select rounded-pill text-lg"
          selected={startDate}
          onChange={(date: any) => {
            onChangeDate(date);
          }}
        />
      </div>
      {!timeCheck ? (
        <div className="pt-30">
          <label htmlFor="time" className={className.label}>
            Pilih Jam
          </label>
          <select
            id="time"
            name="time"
            className="form-select rounded-pill text-lg p-3"
            aria-label="Service Time"
            value={times}
            onChange={(event) => setTimes(event.target.value)}
          >
            {time.map((times: any) => (
              <option key={times._id} value={times._id} selected>
                {times.available ? times.time : null}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="pt-30">
        <label className={className.label}>Keluhan Yang Dialami</label>
        <textarea
          rows={5}
          cols={100}
          className="form-control text-lg"
          placeholder="Your Notes to Mechanic"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </>
  );
}
