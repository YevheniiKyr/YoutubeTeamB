import { Video } from '../entities/Video';
import { dataSource } from '../dataSource';
export const ChannelRepository = dataSource.getRepository(Video).extend({
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  },
  //other functions
});
