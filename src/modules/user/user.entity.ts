import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  public username: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  public password: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
