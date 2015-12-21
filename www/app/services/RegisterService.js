import {Http,HTTP_PROVIDERS} from 'angular2/http'
import { Injectable, Inject } from 'angular2/core';
import {Register,RegisterStudent, RegisterSchedule,Staff,Room,RegisterMark,RegisterSession,DataSet} from '../models/objects'


@Injectable()
export class RegisterService {
  constructor(public http: Http) {
     console.log('Task Service created.', http);
    
     
  }
  


 
  getRegisters() {
   return this.http.get('app/models/registers.json')
    .map((responseData) => {
      return responseData.json();
    })
    .map((registers: Array<any>) => {
      let result:Array<Register> = [];
      if (registers) {
        registers.forEach((reg) => {
          result.push(new Register(reg.registerID,reg.registerNo,reg.title,reg.nextScheduleID));
        });
      }
      return result;
    });
   
  }
 
  
 getMarks() {
   return this.http.get('app/models/marks.json')
   .map((responseData) => {
     
     return responseData.json()
     
   })
 }
 
 
doShit(reg:Register) {
    var ds = new DataSet;
    
    return this.http.get('app/models/registers.json')
    .map((responseData) => {
    
    ds.register= jLinq.from(responseData.json())
    .starts('registerID',reg.registerID)
    .first();
   
    return ds
    })
    .map((ds) => {
        ds.schedule = jLinq.from(ds.register.schedule)
        .starts('registerScheduleID',ds.register.nextScheduleID)
        .first();
      
        return ds
    })
    .map((ds) => {
        ds.students = jLinq.from(ds.register.students)
        .select()
       
        return ds
    })
    .map((ds) => {
       var result = new RegisterSession(
           12345-ds.register.registerID,
           ds.register.registerID,
           0,
           ds.schedule.date,
           ds.schedule.startTime,
           ds.schedule.endTime,          
           0
       )   
        ds.session=result;
      
        return ds;
    })
    .map((ds) => {
        var registerMarkID = 1;
        let marks:Array<RegisterMark> = [];
      if (ds.students) {
        ds.students.forEach((regS) => {
          marks.push(new RegisterMark(registerMarkID,ds.session.registerSessionID,regS.registerStudentID,-1,regS));
          registerMarkID+=1;
        });
      }
      ds.marks = marks;
     
      return ds;
      
    })  
    
    
 
      
    };
    
    
    }
    