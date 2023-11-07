import { Injectable } from '@nestjs/common';

@Injectable({})
export class UserService {
  singIn() {
    return { msg: 'Hello i am signing' };
  }

  register() {
    return { msg: 'Hello i am register' };
  }
}
