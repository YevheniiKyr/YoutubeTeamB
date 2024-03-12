import { Column, Entity, OneToMany } from 'typeorm';
import { Video } from './Video';

@Entity('Channel', { schema: 'youtube' })
export class Channel {
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

  @OneToMany(() => Video, (video) => video.channel)
  videos: Video[];
}
