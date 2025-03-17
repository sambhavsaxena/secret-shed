import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { Queue } from "bullmq";
import Redis from "ioredis";

dotenv.config();

const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
    MAIL_SMTP_SERVICE,
    MAIL_SMTP_USER,
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    tls: { rejectUnauthorized: true }
});

const notification_queue = new Queue('email-queue', { connection: connection.duplicate() });

const queueEmail = async (email, subject, body) => {
    try {
        const response = await notification_queue.add('email', {
            to: email,
            subject,
            body,
            from: MAIL_SMTP_USER,
            service: MAIL_SMTP_SERVICE
        });
        console.log("Job added", response.id);
        return response.id;
    } catch (error) {
        console.error("Failed to add job:", error);
        throw error;
    }
};

const health = asyncHandler(async (req, res) => {
    res.status(200).json({ status: 'ok' })
});

const createProducer = asyncHandler(async (req, res) => {
    try {
        const { email, subject, body } = req.body;
        if (!email || !subject || !body) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }
        const jobId = await queueEmail(email, subject, body);
        res.status(200).json({ success: true, message: 'Email queued successfully', jobId });
    } catch (error) {
        console.error('Error queueing email:', error);
        res.status(500).json({ success: false, message: 'Failed to queue email', error: error.message });
    }
});

process.on('SIGTERM', async () => {
    console.log('Shutting down API server...');
    await notification_queue.close();
    await connection.quit();
    process.exit(0);
});

export { createProducer, health };
