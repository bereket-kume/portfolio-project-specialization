import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { from, Subject } from 'rxjs';
import { text } from 'stream/consumers';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
    });
}
    async sendEmailToAllMembers(emails: string[], message: string) {
        const mailOptions = {
            from: 'bereketkume@gmail.com',
            to: emails.join(','),
            Subject: 'community notification',
            text: message
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.log('Error sending email', error)
            throw new Error('Error sending email');
        }
    }
}
