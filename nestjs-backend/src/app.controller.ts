import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() res: Response) {
    return res.status(200).json({ msg: 'success' });
  }
}
