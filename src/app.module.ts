import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '47.129.7.235',
      port: 5432,
      username: 'admin',
      password: '29aYX%3$&H!(L*@S',
      database: 'socool-ai',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OrderModule,
  ],
})
export class AppModule {}
