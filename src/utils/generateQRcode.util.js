import QRCode from "qrcode";

export const generateQRCodeImage = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    throw new Error("Error generating QR Code");
  }
};
