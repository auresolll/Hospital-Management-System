import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import moment from "moment";
import { FilterQuery, Model } from "mongoose";
import { CurrentUser } from "src/features/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/features/auth/guard/jwt-auth.guard";
import { Product } from "src/features/product/schemas/product.schema";
import { User } from "src/features/user/schemas/user.schema";
import { blockFieldUser } from "src/shared/constants/blockField";
import { PaginationDto } from "src/shared/constants/pagination";
import { ENUM_ROLE_TYPE } from "src/shared/constants/role";
import { getFieldIds } from "src/shared/utils/get-ids";
import { RolesGuard } from "src/shared/utils/roles.guard";
import { Roles } from "../../../shared/utils/roles.decorator";
import { CreateOrderDto } from "../dtos/create-order.dto";
import { FetchOrdersByStatus } from "../dtos/fetch-orders-by-status.dto";
import { Order } from "../schemas/order.schema";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("accessToken")
@Controller("order")
export class OrderController {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  @ApiOperation({
    summary: "Lịch sử  đơn hàng đã mua",
  })
  @ApiTags("Private Order")
  @Roles(ENUM_ROLE_TYPE.CUSTOMER)
  @Get(`histories`)
  async getHistoriesOrders(
    @CurrentUser() user: User,
    @Query() query: PaginationDto
  ) {
    const filter: FilterQuery<Order> = {
      user: user._id,
      created_at: {
        $lt: moment(query.before),
      },
    };

    if (!query.before) delete filter["created_at"];

    const orders = await this.orderModel
      .find(filter)
      .populate({
        path: "product",
        populate: {
          path: "categories",
          model: "Categories",
        },
      })
      .populate({
        path: "product",
        populate: {
          path: "creator",
          model: "User",
          select: blockFieldUser,
        },
      })
      .populate("user", blockFieldUser)
      .limit(query.limit)
      .skip(query.getSkip());

    return orders;
  }

  @ApiOperation({
    summary: "Tạo đơn hàng",
  })
  @ApiTags("Private Order")
  @Roles(ENUM_ROLE_TYPE.CUSTOMER)
  @Post("order")
  async createOrder(@CurrentUser() user: User, @Body() body: CreateOrderDto) {
    const product = await this.productModel.findById(body.product);
    if (!product) throw new NotFoundException("PRODUCT NOT FOUND");

    const originalPrice = body.orderPrice * body.quantity;
    const payload = {
      ...body,
      user: user._id,
      product: product._id,
      discount: product["discount"] || 0,
      totalPrice:
        originalPrice - (originalPrice * product["discount"] || 0 / 100),
    };

    product.numberHasSeller++;
    const created = await this.orderModel
      .create(payload)
      .then(async (response) => {
        await product.save();
        return response;
      });
    return created;
  }

  @ApiOperation({
    summary: "Get tất cả đơn hàng (Người bán)",
  })
  @ApiTags("Private Order")
  @Roles(ENUM_ROLE_TYPE.SELLER)
  @Get("histories-order-seller")
  async getHistoriesOrderForSeller(
    @CurrentUser() user: User,
    @Query() query: PaginationDto
  ) {
    const products = await this.productModel.find({ creator: user._id });
    const [orders, count] = await Promise.all([
      this.orderModel
        .find({
          product: { $in: getFieldIds(products) },
        })
        .limit(query.limit)
        .skip(query.getSkip())
        .sort({ createdAt: -1 }),
      this.orderModel.count({
        product: { $in: getFieldIds(products) },
      }),
    ]);

    return {
      currentPage: query.page,
      limit: query.limit,
      result: orders,
      totalItem: count,
      totalPage: Math.ceil(count / query.limit),
    };
  }

  @ApiOperation({
    summary: "Get tất cả đơn hàng theo trạng thái (Người bán)",
  })
  @ApiTags("Private Order")
  @Roles(ENUM_ROLE_TYPE.SELLER)
  @Get("histories-order-by-status")
  async getOrdersByStatus(
    @CurrentUser() user: User,
    @Query() query: FetchOrdersByStatus
  ) {
    const products = await this.productModel.find({ creator: user._id });
    const filter: FilterQuery<Order> = {
      product: { $in: getFieldIds(products) },
      status: query.status,
    };
    const [orders, count] = await Promise.all([
      this.orderModel
        .find(filter)
        .limit(query.limit)
        .skip(query.getSkip())
        .sort({ createdAt: -1 }),
      this.orderModel.count(filter),
    ]);

    return {
      currentPage: query.page,
      limit: query.limit,
      result: orders,
      totalItem: count,
      totalPage: Math.ceil(count / query.limit),
    };
  }
}
