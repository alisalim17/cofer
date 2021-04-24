import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./Review";
import { User } from "./User";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "text", default: "inprogress" })
  status!: string;

  @Field()
  @Column({ type: "text" })
  codeUrl!: string;

  @Field()
  @PrimaryColumn({ type: "uuid" })
  ownerId!: string;

  @Field()
  @PrimaryColumn({ type: "uuid" })
  reviewOwnerId!: string;

  @Field()
  @PrimaryColumn({ type: "uuid" })
  reviewId!: string;

  // Owner of the offer
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeReview)
  @JoinColumn({ name: "ownerId" })
  owner!: Promise<User>;

  @Field(() => User)
  @ManyToOne(() => Review, (crr) => crr.offers)
  @JoinColumn({ name: "codeReviewId" })
  review!: Promise<Review>;
}
