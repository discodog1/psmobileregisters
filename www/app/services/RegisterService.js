import {Http,HTTP_PROVIDERS} from 'angular2/http'
import { Injectable, Inject } from 'angular2/core';
import {Observable} from 'rxjs/Rx'
import {Register,RegisterStudent, RegisterSchedule,Staff,Room} from '../models/objects'


@Injectable()
export class RegisterService {
  constructor(public http: Http) {
     console.log('Task Service created.', http);
  }
  

  registers: Array<Register>;
  
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
 
 
 getRegisterStudents(registerID:Number) {
   return this.http.get('app/models/registers.json')
    .map((responseData) => {
    
    //given a list of registers, filter for single 
    var filtered = jLinq.from(responseData.json())
    .starts('registerID',registerID)
    .first();
      return filtered.students;
    })
    .map((registerStudents: Array<any>) => {
      let result:Array<RegisterStudent> = [];
      if (registerStudents) {
        registerStudents.forEach((regS) => {
          result.push(new RegisterStudent(regS.refNo,regS.surname,regS.firstName,regS.enrolmentID,regS.thumbnail,regS.completionStatusID,regS.lastAttended));
        });
      }
      return result;
    });
 }
 

 getRegisterSchedule(registerID:Number, registerScheduleID:Number) {
 return this.http.get('app/models/registers.json')
    .map((responseData) => {
    
    var filtered = jLinq.from(jLinq.from(responseData.json())
    .starts("registerID",registerID).select()[0].schedule)
    .starts("registerScheduleID",registerScheduleID)
    .first();
      return filtered;   
    });
 }
  };
