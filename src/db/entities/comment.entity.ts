import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { VideoEntity } from './video.entity';

@Index('parentId', ['parentId'], {})
@Index('videoId', ['videoId'], {})
@Entity('Comment', { schema: 'youtube' })
export class CommentEntity {
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

  @ManyToOne(() => CommentEntity, (comment) => comment.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  comments: CommentEntity[];

  @ManyToOne(() => VideoEntity, (video) => video.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'videoId', referencedColumnName: 'id' }])
  video: VideoEntity;
}
