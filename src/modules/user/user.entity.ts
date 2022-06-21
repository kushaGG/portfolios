import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120 })
  public username: string;

  @Column({ type: 'varchar', select: false })
  public password: string;
}
