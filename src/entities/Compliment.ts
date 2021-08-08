import { Entity,  PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Tag } from './Tag';
import { User } from './User';

@Entity("Compliments")
class Compliment{

  @PrimaryColumn()  
  readonly id: string;

  @Column()
  user_sender: string;

  @Column()
  user_receiver: string;

  @Column()
  tag_id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({name: "tag_id"})
  @ManyToOne(() => Tag)
  tag: Tag;


  @JoinColumn({name: "user_receiver"})
  @ManyToOne(() => User)
  userReceiver: User;


  @JoinColumn({name: "user_sender"})
  @ManyToOne(() => User)
  userSender: User;

  constructor(){
      if(!this.id){
          this.id = uuid();
      }
  }
}
export { Compliment }
