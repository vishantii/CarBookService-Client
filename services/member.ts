import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getMemberOverview() {
  const url = `${ROOT_API}/${API_VERSION}/customers/dashboard`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getMemberTransactions() {
  // let params = "";
  // if (valueParams === "all") {
  //   params = "";
  // } else {
  //   params = `?status=${valueParams}`;
  // }
  const url = `${ROOT_API}/${API_VERSION}/customers/history`;

  return callAPI({
    url,
    method: "GET",
    token: true,
  });
}

export async function getTransactionDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/customers/history/${id}/detail`;

  return callAPI({
    url,
    method: "GET",
    serverToken: token,
  });
}

export const updateProfile = async (data: any, id: string) => {
  const url = `${ROOT_API}/${API_VERSION}/players/profile/${id}`;
  return callAPI({
    method: "PUT",
    url,
    data,
    token: true,
  });
};

export async function updateStatusTransaction(
  data: { status: any },
  id: string
) {
  const url = `${ROOT_API}/${API_VERSION}/customers/transactions/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}
export async function cancelTransaction(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/customers/delete`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
}
export async function changeSchedule(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/customers/transactions/${id}/change-date-time`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
}
