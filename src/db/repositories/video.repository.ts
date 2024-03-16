import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { VideoEntity } from "../entities/video.entity";

@Injectable()
export class VideoRepository extends Repository<VideoEntity>{

    constructor(private dataSource: DataSource)
    {
        super(VideoEntity, dataSource.createEntityManager());
    }

  
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}