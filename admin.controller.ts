import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe,UseGuards, Session, HttpException, HttpStatus } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminLoginDTO, AdminProfileDTO, AdminUpdateDTO, FacultyDTO, ManagmentDTO,  } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ManagerEntity } from "src/manager/manager.entity";
import { SessionGuard } from "./session.gaurd";
import { promises } from "dns";
import { AdminEntity } from "./admin.entity";
import { AdminProfile } from "src/AdminProfile/AdminProfile.entity";

@Controller('admin')
export class AdminController{
constructor(private readonly adminService: AdminService) {}

 @Post('/addadmin')
 @UsePipes(new ValidationPipe())
 addAdmin(@Body() data: AdminDTO): object {
     return this.adminService.addAdmin(data);
 }
 /*@Put('/updateadmin')
    //@UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: AdminDTO): object {
        return this.adminService.updateAdmin(data);
    }

    @Put('/updateadminByid/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param("id") id: number, @Body() data: AdminDTO): object{
      return this.adminService.updateAdminById(id, data);
 }*/

    @Post('/addmanager')
    addManagers(@Body() manager) {
        console.log(manager);
        return this.adminService.addManager(manager);
    }
    @Get('/getmanager/:adminid')
    getManagers(@Param('adminid', ParseIntPipe) adminid:number) {
       
        return this.adminService.getManagersByAdmin(adminid);
    }

  
    @Get('/searchmanager/:id')

    getmanagerId(@Param('id', ParseIntPipe) id: number): object {

      return this.adminService.getmanagerId(id);

  }
 
    @Delete('/deletemanager/:id')
    async deleteManager(@Param('id', ParseIntPipe) id: number): Promise<object> {
      const message = await this.adminService.deleteManager(id);
    return { message };
  }

  @Put('/updatemanager/:id')
  async updateManager(@Param('id', ParseIntPipe) id: number,
  @Body() manager: Partial<ManagerEntity>): Promise<object> {
    const updatedmanager = await this.adminService.updateManager(id, manager);
    return { message: 'Manager updated successfully', manager: updatedmanager };
  }


// @Get('getprofile/:id')
//   async getProfileById(@Param('id') id: number): Promise<AdminProfile> {
//     return this.adminService.getProfileById(id);
//   }

  @Get('/getprofile/:id')
  async getcourses(@Param('id', ParseIntPipe) id: number): Promise<object> {
    try {
      const profile = await this.adminService.getProfileById(id);

      if (!profile) {

        throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);

      }
      const courses = await this.adminService.getProfileById(id);

      return { message: 'Profile found', courses };

    } catch (error) {

      throw new HttpException(error.message, error.getStatus());

    }

  }

  @Put('/addprofile')
  @UseInterceptors(FileInterceptor('image',
      {
          fileFilter: (req, file, cb) => {
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                  cb(null, true);
              else {
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
              }
          },
          limits: { fileSize: 300000000000 },
          storage: diskStorage({
              destination: './uploads',
              filename: function (req, file, cb) {
                  cb(null, Date.now() + file.originalname)
              },
          })
      }
  ))

  @UsePipes(new ValidationPipe)
  addprofile(@Body() mydata: AdminProfileDTO, @UploadedFile() imageobj: Express.Multer.File) {
      console.log(mydata);
      console.log(imageobj.filename);
      mydata.filenames = imageobj.filename;
      return this.adminService.addprofile(mydata);

  }
  @Delete('/deleteProfile/:id')
  async deleteAdminProfile(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const message = await this.adminService.deleteAdminProfile(id);
  return { message };
  }
  @Put('/updateadminProfile/:id')
    //@UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateAdminProfilebyID(@Param("id") id: number, @Body() data: AdminProfileDTO): object {
        return this.adminService.updateAdminProfileById(id, data);
    }

  @Post('/signup')
  @UseInterceptors(FileInterceptor('image',
      {
          fileFilter: (req, file, cb) => {
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                  cb(null, true);
              else {
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
              }
          },
          limits: { fileSize: 300000000000 },
          storage: diskStorage({
              destination: './uploads',
              filename: function (req, file, cb) {
                  cb(null, Date.now() + file.originalname)
              },
          })
      }
  ))
  @UsePipes(new ValidationPipe)
  signup(@Body() mydata: AdminDTO, @UploadedFile() imageobj: Express.Multer.File) {
      console.log(mydata);
      console.log(imageobj.filename);
      mydata.filenames = imageobj.filename;
      return this.adminService.signup(mydata);

  }


@Post('/signin')

async signIn(@Body() data: AdminDTO, @Session() session) {

  const isSignInSuccessful = await this.adminService.signIn(data);

  if (isSignInSuccessful) {
    session.email = data.email;
    return {message: 'Welcome Admin'};
  } else {
    return false;

  }

}


  @Post('logout')
  async logout(@Session() session): Promise<object> {
  if (session) {
    session.destroy();
  }
  return { message: 'Logout successful' };
}


  @Put('/updateadmin/:id')
    //@UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateAdminbyID(@Param("id") id: number, @Body() data: AdminDTO): object {
        return this.adminService.updateAdminById(id, data);
    }
  

  @Delete('/deleteadmin/:id')
  async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const message = await this.adminService.deleteAdmin(id);
  return { message };
}



//mailer
@Post('/send-email')

async sendEmail(@Body() emailData: { subject: string; recipient: string; content: string }): Promise<string> {

  const { subject, recipient, content } = emailData;

  try {

    await this.adminService.sendEmail(subject, recipient, content);

    return 'Email Send' ;

  } catch (error) {

    throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);

  }
}
}
