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
import { Review } from "./Review";

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
  @Column({ type: "text" })
  codeUrl!: string;

  @Field(() => String)
  @PrimaryColumn({ type: "uuid" })
  ownerId!: string;

  @Field(() => String)
  @PrimaryColumn({ type: "uuid" })
  reviewOwnerId!: string;

  @Field(() => String)
  @PrimaryColumn({ type: "uuid" })
  reviewId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeReview)
  @JoinColumn({ name: "ownerId" })
  owner!: Promise<User>;

  @Field(() => User)
  @ManyToOne(() => Review, (crr) => crr.offers)
  @JoinColumn({ name: "codeReviewId" })
  review!: Promise<Review>;
}
