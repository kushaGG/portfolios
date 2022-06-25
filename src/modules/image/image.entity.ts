import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Portfolio } from '../portfolio/portfolio.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 320 })
  public description: string;

  @ApiProperty()
  @Column({ type: 'varchar', array: true, default: [] })
  public comments: string[];

  @ApiProperty()
  @Column({ type: 'varchar' })
  public image: string;

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

  @ApiProperty()
  @Column({ type: 'int' })
  portfolioId: number;

  @JoinTable()
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.images)
  portfolio: Portfolio;
}
