import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import * as mailgun from 'mailgun-js';
import * as crypto from 'crypto';
import { SendOtpDto } from './dto/send-otp.dto';

@Injectable()
export class OtpService {
  private mg: mailgun.Mailgun;

  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {
    this.mg = mailgun({ apiKey: 'c2342f31fb5758c1a2b182b9524929f7-91fbbdba-15db7f7d', domain: 'sandboxaa459408d98a4087a91d6150716171d0.mailgun.org' });
  }

  async sendOtp({email}: SendOtpDto): Promise<void> {
    const otp = crypto.randomBytes(3).toString('hex'); // Generate a 6 character OTP
    // const {email} = payload
    console.log(email)
    const otpEntity = new Otp();
    otpEntity.email = email;
    otpEntity.otp = otp;
    await this.otpRepository.save(otpEntity);

    const data = {
      from: 'YourApp <no-reply@yourdomain.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    this.mg.messages().send(data, (error, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(body);
      }
    });
  }

  async validateOtp(email: string, otp: string): Promise<boolean> {
    const otpEntity = await this.otpRepository.findOne({
      where: { email, otp },
      order: { createdAt: 'DESC' },
    });
    return !!otpEntity;
  }
}
