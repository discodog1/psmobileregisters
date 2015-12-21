import {IonicApp,Page, NavController, NavParams} from 'ionic/ionic';
import {Register,RegisterStudent,RegisterSchedule,RegisterMark,RegisterSession,MarkType,DataSet} from '../objects';
import {RegisterService} from '../../services/RegisterService'

@Page({
   selector: 'take-register', 
   templateUrl:'app/models/TakeRegister/TakeRegister.html',
   providers: [RegisterService],
   bindings: [RegisterService]
   })
   
export class TakeRegister {

	constructor(public regService: RegisterService,app: IonicApp, nav: NavController, navParams: NavParams) { 
   
    this.nav = nav;
       
     //service will be used to retrieve register data
    this.service = regService;
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedRegister = navParams.get('data');  
    
    this.ds = new DataSet;
    this.service.doShit(this.selectedRegister)
    .subscribe(res => this.ds=res,err=>console.log(err),()=>console.log('got it!',this.ds));
  
   this.service.getMarks().subscribe(res => this.markTypes = res);
    
  };
  
  save() {
    console.log(this.registerMarks);
  }
  

  
}
