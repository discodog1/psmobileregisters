import {Component} from 'angular2/core';

@Component({
  
})
export class Register{
   constructor(
  registerID: number,
  registerNo: string,
  title: string,
  nextScheduleID: Number
  //students: RegisterStudent[]
  //schedule: RegisterSchedule[]
  
 ){
   this.registerID = registerID,
   this.registerNo = registerNo;
   this.title = title;
   this.nextScheduleID = nextScheduleID;
   //this.students=students;
   //this.schedule = schedule;
 }

  //students: RegisterStudent[];
  //schedule: RegisterSchedule[]
}

export class RegisterStudent {
  constructor(
  refNo: string,
  surname: string,
  firstName: string,
  enrolmentID: number,
  thumbnail: string,
  completionStatusID: string,
  lastAttended: string
  ){
    this.refNo = refNo;
    this.surname = surname;
    this.firstName=firstName;
    this.enrolmentID=enrolmentID;
    this.thumbnail=thumbnail;
    this.completionStatusID=completionStatusID;
    this.lastAttended=lastAttended;
  }
}

export class RegisterSchedule {
  constructor(
  registerScheduleID: number,
  date: string,
  startTime: string,
  endTime: string,
  lecturers: Staff[],
  rooms: Room[]
  ){
    this.registerScheduleID = registerScheduleID;
    this.date = date;
    this.startTime= startTime;
    this.endTime = endTime;
    this.lecturers = lecturers;
    this.rooms = rooms;
  }
}

export class Staff {
  staffID: number;
  staffRefNo: string;
  staffName: string;
}

export class Room {
  roomID: number;
  roomNo: string;
  description: string;
}
