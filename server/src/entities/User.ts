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

  @Field(() => String, { nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  email!: string;

  @Field(() => ID, { nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  githubId: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  pictureUrl: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  bio!: string;

  @Column({ type: "text", nullable: true })
  password: string;

  // TODO add here before insert to hash password automaticly
}
