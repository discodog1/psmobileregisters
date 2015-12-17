import {IonicApp,Page, NavController, NavParams} from 'ionic/ionic';
import {Register,RegisterStudent,RegisterSchedule} from '../objects';
import {RegisterService} from '../../services/RegisterService'

@Page({
   selector: 'take-register', 
   templateUrl:'app/models/TakeRegister/TakeRegister.html',
   providers: [RegisterService],
   bindings: [RegisterService]
   })
   
export class TakeRegister {
    students:RegisterStudent[];
  selectedRegister: Register;
  selectedSchedule: RegisterSchedule;


	constructor(public regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
    
     
    this.nav = nav;
       
     //service will be used to retrieve register data
    this.service = regService;
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedRegister = navParams.get('data')[0];  
    
    this.selectedSchedule = this
    .service
    .getRegisterSchedule(this.selectedRegister.registerID,this.selectedRegister.nextScheduleID)
    .subscribe(res => this.selectedSchedule = res);
    
    //get register students for register
     this.service.getRegisterStudents(this.selectedRegister.registerID).subscribe(res => this.students = res);
  };
  

  
}
