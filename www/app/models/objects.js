import {Component} from 'angular2/core'

@Component({
  
})
export class Register{
 constructor(
  public registerID: number,
  public registerNo: string,
  public title: string,
  public nextScheduleID: number,
  public students?: RegisterStudent[],
  public schedule?: RegisterSchedule[]
 )
 {
   
 }
}

export class RegisterStudent {
 constructor(
  public registerStudentID: number,
  public refNo: string,
  public surname: string,
  public firstName: string,
  public enrolmentID: number,
  public thumbnail: string,
  public completionStatusID: string,
  public lastAttended: string
 )
 {
   
 }
}

export class RegisterSchedule {
  constructor(
  public registerScheduleID: number,
  public date: string,
  public startTime: string,
  public endTime: string,
  public lecturers: Staff[],
  public rooms: Room[]
  ){}
}

export class Staff {
   constructor(
  public staffID: number,
  public staffRefNo: string,
  public staffName: string
   ){}
}

export class Room {
   constructor(
  public roomID: number,
  public roomNo: string,
  public description: string
   ){}
}

export class RegisterSession {
 constructor(
  public registerSessionID?: number,
  public registerID?: number,
  public sessionNo?: number,
  public date?: string,
  public startTime?: string,
  public endTime?: string,
  public noOfStudentsAttended?: number
 ){}
  
  
  }

export class RegisterMark {
   constructor(
    public registerMarkID: number,
    public registerSessionID: number,
    public registerStudentID: number,
    public markTypeID: number,
    public student: RegisterStudent
   ){}
  
}

export class MarkType {
   constructor(
    public markTypeID: number,
    public mark: string,
    public description: string
   ){}
}
  
  export class DataSet {
      constructor(
         public schedule: RegisterSchedule,
         public session: RegisterSession,
         public marks: RegisterMark,
         public students: RegisterStudent,
         public register:Register
      ){}
  }
