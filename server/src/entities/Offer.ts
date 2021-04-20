import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Review } from "./CodeReview";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  accepted!: boolean;

  @Field(() => String)
  @PrimaryColumn({ type: "uuid" })
  ownerId!: string;

  @Field(() => String)
  @PrimaryColumn({ type: "uuid" })
  codeReviewId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeReview)
  @JoinColumn({ name: "ownerId" })
  owner!: Promise<User>;

  @Field(() => User)
  @ManyToOne(() => Review, (crr) => crr.offers)
  @JoinColumn({ name: "codeReviewId" })
  codeReview!: Promise<Review>;
}
