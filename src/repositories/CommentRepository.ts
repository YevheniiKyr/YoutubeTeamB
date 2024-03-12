import { Comment } from '../entities/Comment';
import { dataSource } from '../dataSource';
export const CommentRepository = dataSource.getRepository(Comment).extend({
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  },
  //other functions
});
