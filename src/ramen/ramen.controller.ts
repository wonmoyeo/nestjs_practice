import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateRamenDto } from './DTO/create-ramen.dto';
import { Response } from 'express';
import { RamenService } from './ramen.service';

@Controller('ramen')
export class RamenController {
  constructor(private ramenService: RamenService) {}

  @Get() // -> GET /ramen
  getRamen(): string {
    return 'ramen';
  }
  @Get('eat') // -> GET /ramen/eat
  eatRamen(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ result: 'yumyum' });
  }
  @Get(':id')
  getThisRamen(@Param() params: any): string {
    return `${params.id}. ramen`;
  }
  @Post()
  async create(@Body() createRamenDto: CreateRamenDto) {
    //json만 되네?
    console.log(createRamenDto);
    return this.ramenService.createRamen(createRamenDto);
  }
}
