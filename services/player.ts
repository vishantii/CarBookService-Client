import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes, TimeDataUpdateTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getDetailVoucher(id: string) {
  const URL = `customers/${id}/detail`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getServiceCategory() {
  const URL = "customers/category";

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}
export async function getServiceSparepart() {
  const URL = "customers/sparepart";

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getServiceTime(data: { date: string }) {
  const url = `${ROOT_API}/${API_VERSION}/schedule/availabilty`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function getCategoryById(data: { id: string }) {
  const url = `${ROOT_API}/${API_VERSION}/customers/category/byId`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/customers/checkout`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function setInvoice(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/customers/invoice`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}

export async function setTimeUpdate(data: TimeDataUpdateTypes) {
  const url = `${ROOT_API}/${API_VERSION}/customers/timeslots`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}
