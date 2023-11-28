import {
  Module,
  OnModuleDestroy,
  OnModuleInit,
  forwardRef,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Subscription } from "rxjs";
import { AuthModule } from "../auth/auth.module";
import { RecoverController } from "./controllers/recover.controller";
import { SettingsController } from "./controllers/settings.controller";
import { SubscriptionController } from "./controllers/subscription.controller";
import { UserController } from "./controllers/user.controller";
import { UserGateway } from "./gateway/user.gateway";
import { Recover, RecoverSchema } from "./schemas/recover.schema";
import {
  SocketConnection,
  SocketConnectionSchema,
} from "./schemas/socket-connection.schema";
import { SubscriptionSchema } from "./schemas/subscription.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { RecoverService } from "./services/recover.service";
import { SocketConnectionService } from "./services/socket-connection.service";
import { SubscriptionService } from "./services/subscription.service";
import { UserService } from "./services/user.service";
import { NotificationModule } from "../notification/notification.module";
import { BasketModule } from "../basket/basket.module";
import { ProductModule } from "../product/product.module";
import { Product, ProductSchema } from "../product/schemas/product.schema";
import { Follow, FollowSchema } from "./schemas/follow.schema";
import { Models } from "src/shared/constants/model";

@Module({
  imports: [
    Models,
    forwardRef(() => AuthModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => BasketModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [
    UserController,
    SubscriptionController,
    RecoverController,
    SettingsController,
  ],
  providers: [
    UserService,
    RecoverService,
    SubscriptionService,
    UserGateway,
    SocketConnectionService,
  ],
  exports: [
    RecoverService,
    UserService,
    SubscriptionService,
    UserGateway,
    SocketConnectionService,
  ],
})
export class UserModule implements OnModuleInit, OnModuleDestroy {
  constructor(private socketConnectionService: SocketConnectionService) {}
  onModuleInit() {
    this.deleteConnections();
  }
  onModuleDestroy() {
    this.deleteConnections();
  }

  deleteConnections() {
    return this.socketConnectionService.deleteAllConnections();
  }
}
