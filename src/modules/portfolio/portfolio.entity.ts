import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Portfolio {
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
  userId: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;

  @OneToMany(() => Image, (image) => image.portfolioId)
  images: Image[];
}
