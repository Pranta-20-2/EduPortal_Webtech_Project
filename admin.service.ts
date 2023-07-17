import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminLoginDTO, AdminProfileDTO, AdminUpdateDTO} from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { ManagerEntity } from "src/manager/manager.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AdminProfile } from "src/AdminProfile/AdminProfile.entity";
import { MailerService } from "@nestjs-modules/mailer";
@Injectable()
    export class AdminService {
        constructor(
            @InjectRepository(AdminEntity)
            private adminRepo: Repository<AdminEntity>,
            @InjectRepository(ManagerEntity)
            private managerRepo: Repository<ManagerEntity>,
            private readonly mailerService: MailerService,
            @InjectRepository(AdminProfile)
            private adminProRepo: Repository<AdminProfile>

           
        ) { }
        async getIndex(): Promise<AdminEntity[]> {
            return this.adminRepo.find();
        }
        async getAdminById(id: number): Promise<AdminEntity> {
            return this.adminRepo.findOneBy({ id });
        }
    
        async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
            return this.adminRepo.findOneBy({ id: id, name: name });
        }
    
        async addAdmin(data: AdminDTO): Promise<AdminEntity> {
            return this.adminRepo.save(data);
        }

        async updateAdmin(email: string,data: AdminUpdateDTO): Promise<AdminEntity> {
            await this.adminRepo.update(data.id, data);
            return this.adminRepo.findOneBy({ id: data.id });
        }
    
        async updateAdminById(id: number, data: AdminDTO): Promise<AdminEntity> {
            await this.adminRepo.update(id, data);
            return this.adminRepo.findOneBy({ id });
        }
    
        async deleteManager(id: number): Promise<string> {

            await this.managerRepo.delete(id);
    
            return "Manager deleted successfully";
    
          }
    
        async addManager(manager): Promise<ManagerEntity> {
            return this.managerRepo.save(manager);
        }
    
        async getAllManagers(): Promise<ManagerEntity[]> {
            return this.managerRepo.find();
        }
        async getManagersByAdmin(adminid: number): Promise<AdminEntity[]> {
            return this.adminRepo.find({
                where: { id: adminid },
                relations: {
                    managers: true,
                },
            });
        }

        async getmanagerId(id: number): Promise<ManagerEntity> {

            return this.managerRepo.findOneBy({id});
    
        }

        async updateManager(id: number,updatedCourse: Partial<ManagerEntity>):Promise<ManagerEntity> {
            await this.managerRepo.update({ id }, updatedCourse);
            return this.managerRepo.findOneBy({ id });
        }

        //studentprofile
        async createAdminWithProfile(admindata: Partial<AdminEntity>, adminProfile: Partial<AdminProfile>): Promise<AdminEntity> {
            const profile = this.adminProRepo.create(adminProfile);
            const admin = this.adminRepo.create({
                ...admindata,
                adminProfiles: [profile],
            });
            await this.adminProRepo.save(profile);
            return this.adminRepo.save(admin);
        }
        async getProfileById(id: number): Promise<AdminProfile> {
            return this.adminProRepo.findOneBy({id});
        }
        async addprofile(data: AdminProfileDTO): Promise<AdminProfile> {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password,salt);
            return this.adminProRepo.save(data);
        }

        async updateAdminProfileById(id: number, data: AdminProfileDTO): Promise<AdminProfile> {
            await this.adminProRepo.update(id, data);
            return this.adminProRepo.findOneBy({ id });
        }
        async deleteAdminProfile(id: number): Promise<string> {

            await this.adminProRepo.delete(id);

            return "Profile deleted successfully";

        }


//mailer
async sendEmail(subject: string, recipient: string, content: string): Promise<void> {

    try{
        await this.mailerService.sendMail({
            to: recipient,
            subject,
            text: content,
        });

    }
    catch(error){

      throw error;

    }

  }

  


  /*async getProfileById(id: number): Promise<StudentProfile> {

    return this.studentProfileRepository.findOneBy({id});

}*/

        async addAdminProfile(adminProfile): Promise<AdminProfile> {
            return this.adminProRepo.save(adminProfile);
        }

        async signup(data: AdminDTO): Promise<AdminEntity> {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password,salt);
           return this.adminRepo.save(data);
        }
    //     async signIn(data: AdminLoginDTO) {
    //     const userdata= await this.adminRepo.findOneBy({email: data.email});
    //     const match:boolean = await bcrypt.compare(data.password, userdata.password);
    //     return match;
    
    // }
    async signIn(data: AdminLoginDTO) {

        const userdata = await this.adminRepo.findOneBy({ email: data.email });
      
        if (!userdata) {
      
          // Handle the case when the user data is not found.
      
          return false;
      
        }
        const match = await bcrypt.compare(data.password, userdata.password);
      
        return match;
      
      }

    async deleteAdmin(id: number): Promise<string> {

        await this.adminRepo.delete(id);

        return "Admin deleted successfully";

      }
       



}