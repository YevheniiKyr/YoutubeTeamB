import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Video } from './Video';

@Index('parentId', ['parentId'], {})
@Index('videoId', ['videoId'], {})
@Entity('Comment', { schema: 'youtube' })
export class Comment {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('text', { name: 'textDisplay', nullable: true })
  textDisplay: string | null;

  @Column('int', { name: 'likeCount', nullable: true })
  likeCount: number | null;

  @Column('datetime', { name: 'publishedAt', nullable: true })
  publishedAt: Date | null;

  @Column('datetime', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @Column('varchar', { name: 'parentId', nullable: true, length: 255 })
  parentId: string | null;

  @Column('varchar', { name: 'videoId', nullable: true, length: 255 })
  videoId: string | null;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  comments: Comment[];

  @ManyToOne(() => Video, (video) => video.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'videoId', referencedColumnName: 'id' }])
  video: Video;
}
