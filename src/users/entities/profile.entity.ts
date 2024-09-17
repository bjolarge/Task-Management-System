// import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import User from "./user.entity";

// export class Profile{
//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column()
//     gender: string

//     @Column()
//     photo: string

//     @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
//     user: User

//     constructor(profile:Partial<Profile>){
//         Object.assign(this,profile)
//     }
// }