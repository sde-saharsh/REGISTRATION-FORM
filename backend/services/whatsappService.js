import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendConfirmationWhatsApp = async (mobileNo, name) => {
  await client.messages.create({
    from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_FROM,  
    to: 'whatsapp:' + mobileNo,                            
    body: `Hello ${name}, thank you for registering for our club/event!`,
  });
};
