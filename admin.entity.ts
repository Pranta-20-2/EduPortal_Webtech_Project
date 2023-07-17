import { AdminProfile } from 'src/AdminProfile/AdminProfile.entity';
import { ManagerEntity } from '../manager/manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from 'typeorm';
@Entity("Admin")
export class AdminEntity{
@PrimaryGeneratedColumn()
id: number;
@Column({name:'name',type: "varchar",length: 150})
name: string;
@Column({type: "varchar",length: 150})
email: string;
@Column()
password: string;
@Column({nullable:true})
filenames:string;



@OneToMany(() => ManagerEntity, manager => manager.admin)
 managers: ManagerEntity[];

@OneToOne(() => AdminProfile, adminProfile => adminProfile.admin)
adminProfiles: AdminProfile[];
}