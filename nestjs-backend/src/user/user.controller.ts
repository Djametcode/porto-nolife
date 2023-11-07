import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class UserController {
  @Post('signIn')
  signIn() {
    return this.signIn();
  }

  @Post('register')
  register() {
    return this.register();
  }
}
