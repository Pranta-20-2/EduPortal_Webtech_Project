import { AdminEntity } from '../admin/admin.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("AdminProfile")
export class AdminProfile{
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column({type: "varchar",length: 150})
email: string;
@Column()
password: string;
@Column({nullable:true})
filenames:string;

@OneToOne(() => AdminEntity, admin => admin.adminProfiles)
admin: AdminEntity;

}