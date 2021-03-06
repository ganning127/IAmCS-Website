import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
    const toEmail = req.body.email;
    // const fromEmail = '"IAmCS Summit Team <IAmCSNC@gmail.com>';
    // const text = `
    //     Hello!
    //     <br />
    //     <br />
    //     Thank you for subscribing to the #IAmCS Summit! We will be sending you an email with the details of the summit soon.
    //     <br />
    //     <br />
    //     Sincerely,
    //     <br />
    //     #IAmCS Team
    // `;

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.EMAIL_PASS
    //     }
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: fromEmail, // sender address
    //     to: toEmail, // list of receivers
    //     subject: "Thanks for signing up for Verste!", // Subject line
    //     html: text // html body
    // });


    const doc = new GoogleSpreadsheet('11JaWSnUXRrKh0AhMmbBRhJqf4mWHhGMn8r4eyz4eaFo');
    const sheetType = req.body.sheetType;
    await doc.useServiceAccountAuth({
        // env var values are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });


    await doc.loadInfo(); // loads document properties and worksheets

    const index = doc.sheetsByIndex.findIndex(sheet => sheet.title === 'Sheet1');

    const sheet = doc.sheetsByIndex[index]; // or use doc.sheetsById[id]
    const date = new Date().toLocaleDateString("en-US");
    await sheet.addRow({ Timestamp: date, Email: toEmail });




    res.status(200).json({
        accepted: true
    });
}