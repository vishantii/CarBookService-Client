import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { Rupiah } from "../../Helpers/convertnumber";

export const downloadInvoice = (data: any) => {
  const doc = new jsPDF();
  autoTable(doc, {
    body: [
      [
        {
          content: "Citra Saputra",
          styles: {
            halign: "left",
            fontSize: 14,
            textColor: "#000000",
          },
        },
        {
          content:
            "Citra Saputra " +
            "\n Jalan Beringin" +
            "\n Pamulang, Tangerang Selatan, 15417",
          styles: {
            halign: "right",
            fontSize: 12,
            textColor: "#000000",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#ffffff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            `Invoice Number : ${data.bookingNumber} ` +
            `\nInvoice Date : ${moment(data.chooseDate).format(
              "DD MMMM YYYY"
            )}`,
          styles: {
            halign: "left",
            fontSize: 12,
            textColor: "#000000",
          },
        },
        {
          content:
            `Nama Pelanggan : ${data.userId.name}\n` +
            `Nomor HP : ${data.userId.phoneNumber}`,
          styles: {
            halign: "left",
            fontSize: 12,
            textColor: "#000000",
          },
        },
      ],
    ],
    theme: "plain",
    margin: {
      top: 40,
    },
    styles: {
      fillColor: "#ffffff",
    },
  });

  autoTable(doc, {
    head: [["Item", "Unit Cost", "Quantity", "Line Total"]],
    body: data.spareparts.map((item, index) => {
      return [
        item?.sparepartId?.name,
        Rupiah(item?.sparepartId?.price),
        item?.quantity,
        Rupiah(item?.quantity * item?.sparepartId?.price),
      ];
    }),
    theme: "striped",
    styles: {
      fillColor: "#ffffff",
      textColor: "#000000",
      lineWidth: 0.1,
      lineColor: "#000000",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `Subtotal  ${Rupiah(data?.total) ?? 0}\n`,
          styles: {
            halign: "right",
            fontSize: 13,
            textColor: "#000000",
          },
        },
      ],
    ],
    theme: "plain",
    margin: {
      top: 40,
    },
    styles: {
      fillColor: "#ffffff",
    },
  });

  doc.save("table.pdf");
};