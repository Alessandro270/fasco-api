import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GenericModule } from './generic/generic.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    GenericModule,
    MailModule,
    ProductModule,
    CategoryModule,
    ReviewModule,
    PurchaseModule,
    CheckoutModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
