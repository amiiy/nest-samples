import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class AppService {
  constructor(@InjectQueue('test') private readonly testQueue: Queue) {}
  getData(): { message: string } {
    return { message: 'Welcome to nest-sample!' };
  }

  async produce() {
    const job = await this.testQueue.add(
      { lolo: 'olol' },
      { priority: Math.random() * 10, delay: 3000, lifo: true }
    );
    const message = `Job ${job.id} has been created`;
    console.log(message);
    return message;
  }
}
