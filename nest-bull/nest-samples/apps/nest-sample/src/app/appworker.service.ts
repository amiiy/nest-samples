import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test')
export class AppServiceWorker {
  @Process()
  async jobInfo(job: Job<unknown>) {
    console.log(`processing job ${job.id} with data:`);
    console.dir(job.data);
  }
}
