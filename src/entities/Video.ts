import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from './Comment';
import { Channel } from './Channel';

@Index('channelId', ['channelId'], {})
@Entity('Video', { schema: 'youtube' })
export class Video {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('datetime', { name: 'publishedAt', nullable: true })
  publishedAt: Date | null;

  @Column('varchar', { name: 'channelId', nullable: true, length: 255 })
  channelId: string | null;

  @Column('varchar', { name: 'channelTitle', nullable: true, length: 255 })
  channelTitle: string | null;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('text', { name: 'description_video', nullable: true })
  descriptionVideo: string | null;

  @Column('varchar', { name: 'duration', nullable: true, length: 255 })
  duration: string | null;

  @Column('varchar', { name: 'definition_video', nullable: true, length: 255 })
  definitionVideo: string | null;

  @Column('varchar', {
    name: 'defaultAudioLanguage',
    nullable: true,
    length: 30,
  })
  defaultAudioLanguage: string | null;

  @Column('bigint', { name: 'viewCount', nullable: true })
  viewCount: string | null;

  @Column('int', { name: 'likeCount', nullable: true })
  likeCount: number | null;

  @Column('int', { name: 'dislikeCount', nullable: true })
  dislikeCount: number | null;

  @Column('int', { name: 'favoriteCount', nullable: true })
  favoriteCount: number | null;

  @Column('int', { name: 'commentCount', nullable: true })
  commentCount: number | null;

  @Column('datetime', { name: 'recordingDate', nullable: true })
  recordingDate: Date | null;

  @Column('text', { name: 'speechText', nullable: true })
  speechText: string | null;

  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  @ManyToOne(() => Channel, (channel) => channel.videos, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'channelId', referencedColumnName: 'id' }])
  channel: Channel;
}
