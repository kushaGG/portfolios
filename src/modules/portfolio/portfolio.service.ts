import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AbstractService } from '../../config/abstract.service';
import { Portfolio } from './portfolio.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PortfolioService extends AbstractService<Portfolio> {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository: Repository<Portfolio>,
  ) {
    super(portfolioRepository);
  }

  async update(id: number, updateDoc: object, ...args) {
    const { userId } = Object.fromEntries([args]);
    const isValid = await this.validate(id, userId, 'update');
    if (isValid) return super.update(id, updateDoc);
  }

  async delete(id: number, ...args): Promise<DeleteResult> {
    const { userId } = Object.fromEntries([args]);
    const isValid = await this.validate(id, userId, 'delete');
    if (isValid) return super.delete(id);
  }

  private async validate(id, userId, callbackTitle) {
    const portfolio = await this.findOne({ id });
    if (portfolio) {
      if (portfolio.userId !== userId) {
        throw new HttpException(
          `You can't ${callbackTitle} that's portfolio`,
          HttpStatus.CONFLICT,
        );
      } else {
        return true;
      }
    } else {
      throw new HttpException('Portfolio not Found', HttpStatus.NOT_FOUND);
    }
  }
}
