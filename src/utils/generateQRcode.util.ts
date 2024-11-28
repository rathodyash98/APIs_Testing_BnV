import QRCode from "qrcode";

// Function to generate QR code image as a data URL
export const generateQRCodeImage = async (data: string): Promise<string> => {
  try {
    // Generate QR code and return as data URL
    return await QRCode.toDataURL(data);
  } catch (error) {
    // Throw error if generation fails
    throw new Error("Error generating QR Code");
  }
};
