import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class CodeReviewRequest extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int" })
  numDays: number;

  @Field(() => String)
  @Column({ type: "text" })
  codeUrl!: string;

  @Field(() => [String!]!)
  @Column({ type: "text", array: true })
  tags!: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: "text" })
  notes: string;

  @Field(() => String)
  @Column({ type: "text" })
  @Index()
  ownerId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeReviewRequests)
  owner!: Promise<User>;
}
