import { TransactionModule } from './transaction/transaction.module';
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
// import { MessagesModule } from "./messages/messages.module";
import { NotificationModule } from "./notification/notification.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { BasketModule } from "./basket/basket.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    // MessagesModule,
    NotificationModule,
    ProductModule,
    BasketModule,
    TransactionModule
  ],
  controllers: [],
  exports: [
    UserModule,
    AuthModule,
    // MessagesModule,
    NotificationModule,
    ProductModule,
    BasketModule,
    TransactionModule
  ],
})
export class FeaturesModule {}
