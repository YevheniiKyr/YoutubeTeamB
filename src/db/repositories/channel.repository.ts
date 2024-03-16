import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ChannelEntity } from "../entities/channel.entity";

@Injectable()
export class ChannelRepository extends Repository<ChannelEntity>{

    constructor(private dataSource: DataSource)
    {
        super(ChannelEntity, dataSource.createEntityManager());
    }

  
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}
