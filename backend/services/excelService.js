import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../utils/registrations.xlsx");


export async function addRegistration(registrationData) {
  let workbook = new ExcelJS.Workbook();
  let worksheet;

  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    // Load existing workbook
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet("Registrations");
  }

  // If no worksheet, create new one
  if (!worksheet) {
    worksheet = workbook.addWorksheet("Registrations");

    // Optional: first row as headers (but not using keys)
    worksheet.addRow([
      "Name",
      "Email",
      "Mobile No",
      "Branch",
      "Class",
      "College Name",
      "Event Name",
      "Payment Mode",
    ]);
  }

  // ✅ Just add raw array instead of relying on keys
  worksheet.addRow([
    registrationData.name,
    registrationData.email,
    registrationData.mobileNo,
    registrationData.branchName,
    registrationData.className,
    registrationData.collegeName,
    registrationData.eventName,
    registrationData.paymentMode,
  ]);

  await workbook.xlsx.writeFile(filePath);
}



export function getExcelFilePath() {
  return filePath;
}
