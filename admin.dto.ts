import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
export class AdminDTO{

    @PrimaryGeneratedColumn()
         id: number;
    
    @Matches( /^[a-z A-Z]+$/, {message:"Enter a proper name"})
    @IsString({message:"Invalid name"})
    @IsNotEmpty({message:"Name can not empty"})
        name : string;

    @IsEmail({}, {message:"Invalid email"} )
    @IsNotEmpty({message:"email can not empty"})
        email : string;
    
    @IsString({message:"Invalid pass"})
    @IsNotEmpty({message:"pass can not empty"})
        password : string;
    filenames: string;


}
export class AdminLoginDTO {
    @IsEmail({}, { message: "Invalid email" })
        email: string;
        password: string;
   
}
export class AdminUpdateDTO {
    id: number;
    name: string;
    email: string;
    password: string;
}
export class FacultyDTO{

    @IsNotEmpty({message:"Number does not empty"})
        id: number;

    @Matches( /^[a-z A-Z]+$/, {message:"Enter a proper name"})
    @IsString({message:"Invalid name"})
    @IsNotEmpty({message:"Name can not empty"})

        name : string;

    @IsEmail({}, {message:"Invalid email"} )
    @IsNotEmpty({message:"Email can not empty"})
        email : string;

    @IsString({message:"Invalid pass"})
    @IsNotEmpty({message:"Password can not empty"})
        password : string;

    @IsString({message:"Invalid department"})
    @IsNotEmpty({message:"Department can not empty"})
        department: string;


}
export class ManagmentDTO{

    @IsNotEmpty({message:"Number can not empty"})
        id: number;

    @Matches( /^[a-z A-Z]+$/, {message:"Enter a proper name"})
    @IsString({message:"Invalid name"})
    @IsNotEmpty({message:"Name can't be empty"})

        name : string;

    @IsEmail({}, {message:"Invalid email"} )
    @IsNotEmpty({message:"Email can't be empty"})
        email : string;

    @IsString({message:"Invalid pass"})
    @IsNotEmpty({message:"Password can't be empty"})
        password : string;

}
export class AdminProfileDTO{

    @PrimaryGeneratedColumn()
         id: number;
    
    @Matches( /^[a-z A-Z]+$/, {message:"Enter a proper name"})
    @IsString({message:"Invalid name"})
    @IsNotEmpty({message:"Name can not empty"})
        name : string;

    @IsEmail({}, {message:"Invalid email"} )
    @IsNotEmpty({message:"email can not empty"})
        email : string;
    
    @IsString({message:"Invalid pass"})
    @IsNotEmpty({message:"pass can not empty"})
        password : string;
    filenames: string;


}