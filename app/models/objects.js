import {Component} from 'angular2/core'

@Component({
  
})
export class Register{
 constructor(
  public mRegisterID,
  public registerID: number,
  public registerNo: string,
  public title: string,
  public sessions?: RegisterSession[]
 )
 {
   
 }
}

export class RegisterStudent {
 constructor(

  public mStudentDetailID,
  public refNo: string,
  public surname: string,
  public firstForename: string,
  public enrolmentID: number,
  public thumbnail: string,
  public completionStatusID: string,
  public lastAttended: string
 )
 {
   
 }
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
  public mRegisterSessionID,
  public registerSessionID?: number,
  public registerTaken?: boolean,
  public mRegisterID?: number,
  public sessionNo?: number,
  public date?: string,
  public startTime?: string,
  public endTime?: string,
  public noOfStudentsAttended?: number,
  public marks?: RegisterMark[],
  public lecturers?: Staff[],
  public rooms?: Room[]
 ){}
  
  
  }

export class RegisterMark {
   constructor(
    public mRegisterMarkID,
    public mRegisterSessionID,
    public mStudentDetailID,
    public markTypeID: number,
    public sequenceNo: number,
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
         public session: RegisterSession,
         public marks: RegisterMark,     
         public register:Register
      ){}
  }
