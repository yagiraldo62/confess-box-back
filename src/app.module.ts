import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from 'modules/post/post.module';
import { MailModule } from './shared/infrastructure/mail/mail.module';

@Module({
  imports: [AuthModule, PostModule, MailModule],
  providers: [],
})
export class AppModule {}
