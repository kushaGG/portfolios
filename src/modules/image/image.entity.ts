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

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'varchar', length: 320 })
  public description: string;

  @Column({ type: 'varchar', array: true, default: [] })
  public comments: string[];

  @Column({ type: 'varchar' })
  public image: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @Column({ type: 'int' })
  portfolioId: number;

  @JoinTable()
  @ManyToOne(() => Portfolio, (portfolio) => portfolio.images)
  portfolio: Portfolio;
}
