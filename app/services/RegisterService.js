/* global console,localStorage,JSON */

import {Http,HTTP_PROVIDERS,Headers} from 'angular2/http'
import {Injectable, Inject } from 'angular2/core';
import {Register,RegisterStudent, Staff,Room,RegisterMark,RegisterSession,DataSet,SystemSetting} from '../models/objects'



@Injectable()
export class RegisterService {
  constructor(public http: Http) {
     console.log('Task Service created.', http);
    
      this.jwt = localStorage.getItem('id_token');
     
      this.authHeader = new Headers();
        if(this.jwt) {
            this.authHeader.append('Authorization', 'Bearer ' + this.jwt);      
        }
        
        //stats
        this.taken=0;
        this.today=0;
        this.missed=0;
        
        this.getRegisterStats();
  }
  

  getRegisters() {
   return this.http.get(localStorage.getItem('serviceUrl') + 'getregisterstoday.ashx?DeviceID=' + localStorage.getItem('deviceID'), {headers: this.authHeader})
    .map((responseData) => {
      return responseData.json();
    })
    .map((registers: Array<any>) => {
      let result:Array<Register> = [];
      if (registers) {
        registers.forEach((reg) => {
          result.push(new Register(reg.mRegisterID, reg.registerID,reg.registerNo,reg.title));
        });
      }
      localStorage.setItem("Registers",JSON.stringify(result));
      localStorage.setItem("MyRegistersToday",JSON.stringify(registers));
      return result;
    });
   
  }
 
  
 getMarks() {
   return this.http.get(localStorage.getItem('serviceUrl') + 'GetMarkTypes.ashx', {headers: this.authHeader})
   .map((responseData) => {
     localStorage.setItem("MarkTypes",JSON.stringify(responseData.json()));
     return responseData.json()
     
   })
 }
 
 loadSessions(reg:Register) {
      let result:Array<RegisterSession> = [];
      
      var data = JSON.parse(localStorage.getItem("MyRegistersToday"));
      
      result = jLinq.from(data)
    .starts('registerID',reg.registerID)
    .first();
   
   return result;
     
 }
loadDataSet(sess:RegisterSession) {
    var ds = new DataSet;
    
    var data = JSON.parse(localStorage.getItem("MyRegistersToday"));
    
    ds.register= jLinq.from(data)
    .starts('registerID',sess.registerID)
    .first();
   
   ds.session = jLinq.from(ds.register.sessions)
   .starts('mRegisterSessionID',sess.mRegisterSessionID)
   .first();
  //ds.register.sessions[0];
   
   
   ds.marks = ds.session.marks;
    return ds
   
        
    };
    
    save(sess:RegisterSession) {
        let result:Array<Register> = [];
        
        //get original data
        result = JSON.parse(localStorage.getItem("MyRegistersToday"));
        
       sess.registerTaken = true;
          
        if (result) {
            for (var i=0;i < result.length;i++) {
                if (result[i].mRegisterID === sess.mRegisterID) {
                    for (var x=0;x<result[i].sessions.length;x++) {
                        if (result[i].sessions[x].mRegisterSessionID === sess.mRegisterSessionID) {
                            result[i].sessions[x] = sess
                            break;
                        }
                    }
                }
            }
        };
            
        //store changes                
        localStorage.setItem("MyRegistersToday", JSON.stringify(result));
                
        return true;
    }
    
    
    getSystemSettings() {
            
        return this.http.get(localStorage.getItem('serviceUrl') + 'GetSystemSettings.ashx', {headers: this.authHeader})
        .map((responseData) => {
            localStorage.setItem("SystemSettings",JSON.stringify(responseData.json()));
            return responseData.json()
            
        })
    }
    
    Sync() {         
        var data = localStorage.getItem("MyRegistersToday");     
        if (!data) {
            data=[];
        }             
          if (data.length > 2) {             
              return this.http.post(localStorage.getItem('serviceUrl') + 'HandleSessions.ashx?DeviceID=' + localStorage.getItem('deviceID'),data, {headers: this.authHeader})  
          }                                  
      }
      
    
    getRegisterStats() {
        
        let result:Array<Register> = [];
        
        //get original data
        result = JSON.parse(localStorage.getItem("MyRegistersToday"));
        
             
        if (result) {
            for (var i=0;i < result.length;i++) {
                let result2:Array<RegisterSession> = [];
                result2=result[i].sessions;
                 if (result2) {
                     for (var i2=0;i2 < result2.length;i2++) {
                         if (result[i].sessions[i2].registerTaken) {
                             this.taken ++;
                         }
                         else {
                             //console.log('date: ' + result[i].sessions[i2].date + ', start: ' + result[i].sessions[i2].startTime)
                             var t = new Date(result[i].sessions[i2].endTime);
                             var str = result[i].sessions[i2].date;
                             var parts = str.split("/");
                             var d = new Date(parseInt(parts[2], 10),
                                            parseInt(parts[1], 10) - 1,
                                            parseInt(parts[0], 10));
                             var dt = d.setHours(t.getHours());
                             //console.log(dt);
                             var now = new Date(); 
                             if (dt < now) {
                                this.missed++;
                             }
                             var g = new Date(dt);
                             //console.log('g:',g)
                             g=g.setHours(0,0,0,0);
                             now=now.setHours(0,0,0,0);
                             if(g == now)
                                {                                 
                                    this.today++;
                                }
                         }
                     }
                 }
            }
        };
    }
    }
    