import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppServiceWorker } from './appworker.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: { host: 'localhost', port: 6379, showFriendlyErrorStack: true },
      settings: {
        lockDuration: 300000,
        stalledInterval: 300000,
      },
    }),
    BullModule.registerQueue({ name: 'test', redis: { port: 6379 } }),
  ],
  controllers: [AppController],
  providers: [AppService, AppServiceWorker],
})
export class AppModule {}
