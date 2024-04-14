const express = require("express");
const bodyParser = require('body-parser')
const m_member = require('./midleware/m_member')
const AuthEmployee = require('./database/crud/AuthEmployee')
const Message = require('./util/message')

const pool = require('./database/connect')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // กำหนดโดเมนที่อนุญาตให้เข้าถึง
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost.com');

    // กำหนดเมทอดและหัวเรื่องที่อนุญาต
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // อนุญาตให้เป็นการร้องขอที่มีเครื่องหมายย่อยได้
    res.setHeader('Access-Control-Allow-Credentials', true);

    // อนุญาตให้แอปพลิเคชันอื่นๆ ส่งคำร้องขอ XHR และ Fetch มายังแอปพลิเคชันของเรา
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // หากเป็นการร้องขอที่มีวิธีการเป็น OPTIONS ให้ตอบกลับเท่านั้น
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    // ผ่าน middleware ไปยังตัวถัดไป
    next();
});

app.use('/api',require('./routes/r_Auth'))
app.use('/api',require('./routes/r_Member'))
app.use('/api',require('./routes/r_Employee'))
app.use('/api',require('./routes/r_Manager'))

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
