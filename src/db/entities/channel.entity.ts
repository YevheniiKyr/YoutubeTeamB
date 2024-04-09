import { Column, Entity, OneToMany } from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity('Channel')
export class ChannelEntity {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('text', { name: 'description_channel', nullable: true })
  descriptionChannel: string | null;

  @Column('varchar', { name: 'customURL', nullable: true, length: 255 })
  customUrl: string | null;

  @Column('datetime', { name: 'publishedAt', nullable: true })
  publishedAt: Date | null;

  @Column('varchar', { name: 'defaultLanguage', nullable: true, length: 30 })
  defaultLanguage: string | null;

  @Column('varchar', { name: 'country', nullable: true, length: 50 })
  country: string | null;

  @Column('bigint', { name: 'viewCount', nullable: true })
  viewCount: string | null;

  @Column('int', { name: 'subscriberCount', nullable: true })
  subscriberCount: number | null;

  @Column('int', { name: 'videoCount', nullable: true })
  videoCount: number | null;

  @OneToMany(() => VideoEntity, (video) => video.channel)
  videos: VideoEntity[];
}
