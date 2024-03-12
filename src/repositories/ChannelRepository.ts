import { Channel } from '../entities/Channel';
import { dataSource } from '../dataSource';
export const ChannelRepository = dataSource.getRepository(Channel).extend({
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  },
  //other functions
});
