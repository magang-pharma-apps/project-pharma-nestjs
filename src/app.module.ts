import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import ormconfig from './config/ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { InventoriesModule } from './modules/inventories/inventories.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UnitsModule } from './modules/units/units.module';
// import { ProductMixturesModule } from './modules/product_mixtures/product_mixtures.module';
import { CompoundProductsModule } from './modules/compound_products/compound_products.module';
import { StockAdjustmentsModule } from './modules/stock_adjustments/stock_adjustments.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    CategoriesModule,
    ProductsModule,
    SuppliersModule,
    InventoriesModule,
    WarehouseModule,
    TransactionsModule,
    UnitsModule,
    // ProductMixturesModule,
    CompoundProductsModule,
    StockAdjustmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
