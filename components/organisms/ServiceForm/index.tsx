import { useCallback, useEffect, ChangeEvent, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { CategoryTypes } from "../../../services/data-types";
import {
  getCategoryById,
  getServiceCategory,
  getServiceSparepart,
  getServiceTime,
} from "../../../services/player";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { Rupiah } from "../../../Helpers/convertnumber";

interface Part {
  _id: string;
  name: string;
  price: number;
}
interface Category {
  _id: any;
  name: string;
  price: number;
}

const className = {
  label: cx("form-label text-lg fw-medium rounded-pill color-palette-1 mb-10"),
};

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    carBrand: "",
    carType: "",
    carYear: "",
    miles: "",
    licensePlate: "",
    startDate: "",
    time: [],
    times: "",
    notes: "",
    catById: {},
    total: 0,
  });

  const [categories, setCategories] = useState([]);
  const [catById, setCatById] = useState<any>({
    _id: "",
    name: "",
    price: 0,
  });
  const [availableParts, setAvailableParts] = useState<Part[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [partQuantities, setPartQuantities] = useState<{
    [id: string]: number;
  }>({});

  const timeCheck = _.isEmpty(formData.time);

  const router = useRouter();

  const getServiceCategoryAPI = useCallback(async () => {
    const data = await getServiceCategory();

    setCategories(data);
  }, [getServiceCategory]);

  const getServiceSparepartAPI = useCallback(async () => {
    const parts = await getServiceSparepart();
    setAvailableParts(parts);
  }, [getServiceSparepart]);

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

  const onSelectCategory = async (value) => {
    const res = await getCategoryById({ id: value }); // Pass the value directly
    res.data.map((item: any) =>
      setCatById({
        id: item._id,
        name: item.name,
        price: item.price,
      })
    );
  };

  useEffect(() => {
    getServiceCategoryAPI();
    getServiceSparepartAPI();
  }, []);

  const onSubmit = () => {
    const date = moment(formData.startDate).format("YYYY-MM-DD");
    const spareParts: any[] = [];
    let totalPrice: any = 0;

    selectedParts.forEach((partId: any) => {
      const part = availableParts.find((p) => p._id === partId);
      if (part) {
        const quantity = partQuantities[partId] ?? 0;
        spareParts.push({
          sparepartId: part._id,
          name: part.name,
          price: part.price,
          quantity: quantity,
        });
        totalPrice += part.price * quantity;
      }
    });

    const finalPrice = parseInt(totalPrice) + parseInt(catById.price);

    const userForm = {
      ...formData,
      date,
      catById,
      spareparts: spareParts,
      total: finalPrice,
    };

    localStorage.setItem("service-form", JSON.stringify(userForm));
    router.push("/checkout");
  };

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const SparePartsList = () => {
    const handleQuantityChange = (partId: string, quantity: number) => {
      if (quantity === 0) {
        setPartQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[partId];
          return newQuantities;
        });

        setSelectedParts((prevSelectedParts) =>
          prevSelectedParts.filter((id) => id !== partId)
        );
      } else {
        setPartQuantities((prevQuantities) => ({
          ...prevQuantities,
          [partId]: quantity,
        }));
      }
    };

    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const options = event.target.options;
      const selectedIds: string[] = [];
      for (let i = 0; i < options.length; i++) {
        const option = options.item(i);
        if (option?.selected) {
          selectedIds.push(option.value);
        }
      }

      // Filter out already selected parts
      const newSelectedParts = selectedIds.filter(
        (partId: string) => !partQuantities.hasOwnProperty(partId)
      );

      // Add new parts with default quantity of 1
      setPartQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        newSelectedParts.forEach((partId) => {
          newQuantities[partId] = 1;
        });
        return newQuantities;
      });

      setSelectedParts((prevSelectedParts) => [
        ...prevSelectedParts,
        ...newSelectedParts,
      ]);
    };

    return (
      <>
        <select
          className="form-select d-block w-100"
          multiple // Add the "multiple" attribute here
          value={selectedParts}
          onChange={handleSelectChange}
        >
          {availableParts.map((part: any) => (
            <option
              key={part._id}
              value={part._id}
              disabled={part.status === "N"}
            >
              {part.name} - {Rupiah(part.price)}
            </option>
          ))}
        </select>

        {selectedParts.map((partId) => {
          const part = availableParts.find(({ _id }) => _id === partId);
          if (!part) {
            return null;
          }
          const quantity = partQuantities[partId] ?? 0;
          return (
            <div key={partId} className="d-flex align-items-center my-2">
              <div className="flex-grow-1">
                {part.name} - {Rupiah(part.price)}
              </div>
              <div className="d-inline-block ml-3">
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => handleQuantityChange(partId, quantity - 1)}
                  disabled={quantity <= 0}
                >
                  <i className="fa fa-minus">-</i>
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => handleQuantityChange(partId, quantity + 1)}
                >
                  <i className="fa fa-plus">+</i>
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
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
          name="carBrand"
          value={formData.carBrand}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Tipe Mobil</label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          placeholder="Enter your Car Type"
          name="carType"
          value={formData.carType}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Tahun Mobil</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Enter Car Year"
          name="carYear"
          value={formData.carYear}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Jarak Tempuh</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Enter Miles"
          name="miles"
          value={formData.miles}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Nomor Plat</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          placeholder="Enter License Plate"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Kategori Service</label>
        <select
          name="categories"
          id="categories"
          className="form-control rounded-pill text-lg category-select p-3"
          onChange={(event) => {
            onSelectCategory(event.target.value);
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category: CategoryTypes) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Sparepart yang Tersedia
        </h2>
        <SparePartsList />
      </div>
      <div className="pt-30">
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

      <div className="pt-30">
        <label className={className.label}>Catatan</label>
        <textarea
          name="notes"
          id="notes"
          cols={30}
          rows={5}
          className="form-control rounded-lg"
          placeholder="Type your notes here..."
          defaultValue={""}
          onChange={handleChange}
        />
      </div>
      <div className="button-group d-flex flex-row mt-50 pt-4">
        <button
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill"
          disabled={
            timeCheck ||
            !formData.carBrand ||
            !formData.carType ||
            !formData.carYear ||
            !formData.miles ||
            !formData.licensePlate ||
            !formData.startDate ||
            !formData.times
          }
          onClick={onSubmit}
        >
          Continue to Book
        </button>
      </div>
    </>
  );
}
