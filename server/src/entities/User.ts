import { Field, ObjectType, Int, ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  username!: string;

  @Field(() => ID, { nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  githubId: string;

  @Field()
  @Column({ type: "text" })
  pictureUrl!: string;

  @Field()
  @Column({ type: "text" })
  bio!: string;

  @Column({ type: "text", nullable: true })
  password: string;
}
