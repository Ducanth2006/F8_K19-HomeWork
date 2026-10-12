import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/module';
import { TodoModule } from './todos/module';

@Module({
  imports: [CategoryModule,TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
