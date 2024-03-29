import { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { CategoryTypes } from "../../../services/data-types";
import { getCategoryById } from "../../../services/player";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import _ from "lodash";
import { Rupiah } from "../../../Helpers/convertnumber";
import { getCarById } from "../../../services/player";
import Select from "react-select";
import { getQueue } from "../../../services/member";
import { toast } from "react-toastify";

const className = {
  label: cx("form-label text-lg fw-medium rounded-pill color-palette-1 mb-10"),
};

export default function ServiceForm({
  categoryData,
  sparepartData,
  carsData,
  setShowModal,
}) {
  const [formData, setFormData] = useState({
    miles: "",
    licensePlate: "",
    startDate: "",
    queue: 0,
    notes: "",
    catById: {},
    total: 0,
  });

  const [catById, setCatById] = useState<any>({
    _id: "",
    name: "",
    price: 0,
  });
  const [carById, setCarById] = useState<any>({
    _id: "",
    name: "",
    price: 0,
  });
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [partQuantities, setPartQuantities] = useState<{
    [id: string]: number;
  }>({});

  // const timeCheck = _.isEmpty(formData.time);
  const catCheck = _.isEmpty(catById?.name);

  const router = useRouter();

  const onChangeDate = async (dates: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: dates,
    }));
    const convertDate = moment(dates).format("YYYY-MM-DD");
    const res = await getQueue({ chooseDate: convertDate, category: catById });
    if (res.error) {
      toast.error(res.message);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      queue: res.data.data,
    }));
  };

  const onSelectCategory = async (value: any) => {
    const res = await getCategoryById({ id: value }); // Pass the value directly
    res.data.map((item: any) =>
      setCatById({
        id: item._id,
        name: item.name,
        price: item.price,
      })
    );
  };

  const onSubmit = () => {
    const date = moment(formData.startDate).format("YYYY-MM-DD");
    const spareParts: any[] = [];
    let totalPrice: any = 0;

    selectedParts.forEach((partId: any) => {
      const part = sparepartData.find((p) => p._id === partId);
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
      carById,
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

  const renderCarList = () => {
    const [selectedCar, setSelectedCar] = useState(null);

    const carOptions = carsData.map((car: any) => ({
      label: `${car.Year} - ${car.Make} - ${car.Model} - ${car.Category}`,
      value: car._id,
    }));

    const onSelectCar = async (value: any) => {
      const res = await getCarById({ id: value });
      res.data.map((item: any) =>
        setCarById({
          id: item._id,
          make: item.Make,
          model: item.Model,
          category: item.Category,
          year: item.Year,
        })
      );
    };

    const handleChange = (selectedOption: any) => {
      setSelectedCar(selectedOption);
      onSelectCar(selectedOption.value);
    };

    return (
      <div className="pt-30">
        <label className={className.label}>Pilih Mobil</label>
        <Select
          value={selectedCar}
          onChange={handleChange}
          options={carOptions}
          isSearchable={true}
          placeholder="Select Cars"
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "white",
              borderColor: "#0c145a",
              borderRadius: "50px",
              "&:hover": {
                borderColor: "gray",
              },
              padding: "0.6rem",
              fontSize: 16,
              boxShadow: state.isFocused
                ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
                : "",
            }),
            menu: (provided, state) => ({
              ...provided,
              zIndex: 2,
            }),
          }}
        />
      </div>
    );
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
        (partId) => !partQuantities.hasOwnProperty(partId)
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

    const sortedSparepartData = sparepartData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return (
      <>
        <select
          className="form-select d-block w-100"
          multiple // Add the "multiple" attribute here
          value={selectedParts}
          onChange={handleSelectChange}
        >
          {sortedSparepartData.map((part: any) => (
            <option
              key={part._id}
              value={part._id}
              disabled={
                part.status === "N" || part.stock === 0 || part.stock === "0"
              }
            >
              {part.name} - {Rupiah(part.price)}
            </option>
          ))}
        </select>

        {selectedParts.map((partId) => {
          const part = sparepartData.find(({ _id }) => _id === partId);
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
      {renderCarList()}
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
      <div className="pt-30 ">
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
          {categoryData.map((category: CategoryTypes) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <a
          className="text-info font-weight-bold"
          onClick={() => setShowModal(true)}
        >
          <u> Anda bingung memilih? </u>
        </a>
      </div>
      <div className="pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Sparepart yang Tersedia
        </h2>
        {SparePartsList()}
      </div>
      <div className="pt-30">
        <label className={className.label}>Pilih Tanggal Service</label>
        <DatePicker
          disabled={catCheck}
          minDate={moment().toDate()}
          placeholderText="Pilih Tanggal"
          className="form-select rounded-pill text-lg"
          selected={formData.startDate}
          onChange={(date: any) => {
            onChangeDate(date);
          }}
        />
        <label className="pt-1">{`Jumlah Antrian = ${formData.queue}`}</label>
      </div>
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
            !formData.miles || !formData.licensePlate || !formData.startDate
          }
          onClick={onSubmit}
        >
          Continue to Book
        </button>
      </div>
    </>
  );
}
