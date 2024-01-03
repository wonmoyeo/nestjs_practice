import { Injectable } from '@nestjs/common';
import { Ramen } from './interfaces/ramen.interface';

@Injectable()
export class RamenService {
  private readonly ramens: Ramen[] = [];

  createRamen(newRamen: Ramen) {
    this.ramens.push(newRamen);
    return this.ramens;
  }

  getRamens(): Ramen[] {
    return this.ramens;
  }
}
