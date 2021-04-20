import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./CodeReview";
import { Offer } from "./Offer";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Review, (crr) => crr.owner)
  codeReview: Review[];

  @OneToMany(() => Offer, (offer) => offer.owner)
  offers: Offer[];
}
