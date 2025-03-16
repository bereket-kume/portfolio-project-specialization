import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('send')
    async sendEmail(@Body() body: { communityMembers: string[], message: string }) {
        const { communityMembers, message } = body;
        try {
            await this.emailService.sendEmailToAllMembers(communityMembers, message);
            return { success: true, message: 'Emails sent successfully' };
        } catch (error) {
            return { success: false, message: `Error sending email: ${error.message}` };
        }
    }
}
