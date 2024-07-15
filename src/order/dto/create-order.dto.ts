import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'PRODUCT123', description: 'Product code' })
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({ example: 'Product Name', description: 'Product name' })
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 100, description: 'Unit price' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ example: 2, description: 'Quantity' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 200, description: 'Total price' })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ example: '123456', description: 'OTP code' })
  @IsNotEmpty()
  otp: string;
}
