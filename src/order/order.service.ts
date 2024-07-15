import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OtpService } from './otp.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly otpService: OtpService,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const { email, otp, productCode, productName, unitPrice, quantity } = orderDto;

    const isOtpValid = await this.otpService.validateOtp(email, otp);
    if (!isOtpValid) {
      throw new Error('Invalid OTP');
    }

    const totalPrice = unitPrice * quantity;
    const order = this.orderRepository.create({
      email,
      productCode,
      productName,
      unitPrice,
      quantity,
      totalPrice,
    });

    return this.orderRepository.save(order);
  }
}
