import { Controller, Post, Body, HttpCode, Param } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendOtpDto } from './dto/send-otp.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly otpService: OtpService,
    private readonly orderService: OrderService,
  ) {}

  @Post('send-otp')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send OTP to user email' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async sendOtp(@Body() payload: SendOtpDto): Promise<void> {
    await this.otpService.sendOtp(payload);
  }

  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or request' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    await this.orderService.createOrder(createOrderDto);
  }
}
