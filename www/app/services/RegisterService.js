/* global console,localStorage,JSON */

import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http'
import { Injectable, Inject } from 'angular2/core';
import {Register,RegisterStudent, RegisterSchedule,Staff,Room,RegisterMark,RegisterSession,DataSet} from '../models/objects'
import {AuthHttp} from 'angular2-jwt/angular2-jwt'
import {provide} from 'angular2/core';

@Injectable()
export class RegisterService {
  constructor(public http: Http) {
     console.log('Task Service created.', http);
    
     this.jwt = localStorage.getItem('id_token');
     
      this.authHeader = new Headers();
        if(this.jwt) {
            this.authHeader.append('Authorization', 'Bearer ' + this.jwt);      
        }
  }
  

  getRegisters() {
   return this.http.get('http://localhost/psmobileregisters_backend/getregisterstoday.ashx', {headers: this.authHeader})
    .map((responseData) => {
      return responseData.json();
    })
    .map((registers: Array<any>) => {
      let result:Array<Register> = [];
      if (registers) {
        registers.forEach((reg) => {
          result.push(new Register(reg.registerID,reg.registerNo,reg.title,reg.marked));
        });
      }
      localStorage.setItem("Registers",JSON.stringify(result));
      return result;
    });
   
  }
 
  
 getMarks() {
   return this.http.get('http://localhost/psmobileregisters_backend/GetMarkTypes.ashx', {headers: this.authHeader})
   .map((responseData) => {
     localStorage.setItem("MarkTypes",JSON.stringify(responseData.json()));
     return responseData.json()
     
   })
 }
 
 
loadDataSet(reg:Register) {
    var ds = new DataSet;
    
    return this.http.get('http://localhost/psmobileregisters_backend/getregisterstoday.ashx', {headers: this.authHeader})
    .map((responseData) => {
    
    ds.register= jLinq.from(responseData.json())
    .starts('registerID',reg.registerID)
    .first();
   
    return ds
    })
    .map((ds) => {
        var s = RegisterSchedule;         
        s = jLinq.from(ds.register.schedule) //all schedules
        .starts("taken", false)
        .sort("date")
        .first();
        
        ds.schedule = new RegisterSchedule(s.taken,s.registerScheduleID,s.date,s.startTime,s.endTime,s.lecturers,s.rooms);
        
        return ds
    })
    .map((ds) => {
        if (ds.register.students) {
        ds.students = jLinq.from(ds.register.students)
        .select()
        }
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
         if (ds.register.students) {
        var registerMarkID = 1;
        let marks:Array<RegisterMark> = [];
      if (ds.students) {
        ds.students.forEach((regS) => {
          marks.push(new RegisterMark(registerMarkID,ds.session.registerSessionID,regS.registerStudentID,-1,regS));
          registerMarkID+=1;
        });
      }        
      ds.marks = marks;
         }
     
      return ds;
      
    })      
    };
    
    save(ds:DataSet) {
        
        var s:RegisterSession = ds.session;
        s.marks = ds.marks;
             
        if (!localStorage.getItem("sessions")){
              localStorage.setItem("sessions", '[]');
        }
        var sessions = JSON.parse(localStorage.getItem("sessions"));
        
        if (s.length) {
            while (s.length >0) {
                sessions.push(s.pop());
            }
        }
        else {
            sessions.push(s);
        }
        
        localStorage.setItem("sessions", JSON.stringify(sessions));
        
        // if (!localStorage.getItem("marks")){
        //       localStorage.setItem("marks", '[]');
        // }
        // var marks = JSON.parse(localStorage.getItem("marks"));       
        
        // if (m.length) {
        //     while (m.length >0) {
        //         marks.push(m.pop());
        //     }
        // }
        // else {
        //     marks.push(m);
        // }
        
        // localStorage.setItem("marks", JSON.stringify(marks));
      
      //flag schedule as done so it's not marked again
       ds.schedule.taken = true;
       
        return true;
    }
    
    }
    