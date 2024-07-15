import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Otp } from './otp.entity';
import { OtpService } from './otp.service';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Otp])],
  providers: [OtpService, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
