import validator from 'validator';
// import {addRegistration} from '../services/excelService.js';    
import {sendConfirmationEmail} from '../services/emailService.js';    
import { addRegistration } from "../services/excelService.js";
import { getExcelFilePath } from "../services/excelService.js";



const registerUser = async (req, res) => {
  try {
    const { name, email, mobileNo, branchName, className, collegeName, eventName, paymentMode } = req.body;

    if (!name || !email || !mobileNo || !branchName || !className || !collegeName || !eventName || !paymentMode) {
      return res.json({ success: false, message: "Please fill all the fields ,jii" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (!validator.isMobilePhone(mobileNo)) {
      return res.json({ success: false, message: "Invalid mobile number" });
    }

    await addRegistration({ name, email, mobileNo, branchName, className, collegeName, eventName, paymentMode });
    await sendConfirmationEmail(email, name);
    // await whatsappService.sendConfirmationWhatsApp(mobileNo, name);

    res.json({ success: true, message: "Registration successful! Confirmation sent." });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const downloadRegistrations = (req, res) => {
  const file = getExcelFilePath();
  res.download(file, "registrations.xlsx", (err) => {
    if (err) {
      res.json({success:false,message:"cant download now !!"+err });
    }
  });
};

export { registerUser ,downloadRegistrations};
