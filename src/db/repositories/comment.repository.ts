import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { ChannelEntity } from "../entities/channel.entity";
import { CommentEntity } from "../entities/comment.entity";

@Injectable()
export class CommentRepository extends Repository<CommentEntity>{

    constructor(private dataSource: DataSource)
    {
        super(CommentEntity, dataSource.createEntityManager());
    }

  
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}