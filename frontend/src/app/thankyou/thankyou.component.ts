import { Component } from '@angular/core';
import { SharedService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css'
})
export class ThankyouComponent {

  userLogged:string='';
  display:string='';

  constructor(private sharedService: SharedService, private router: Router) {

    this.sharedService.currentUser.subscribe((user) => {
      this.userLogged = user;
      //console.log('logged room is ' + this.currentUserRoomNumber);
    });
    if(this.userLogged === 'admin'){
      this.display='THANK YOU FOR PURCHASING ALL.';
    }
    else{
      this.display='THANK YOU. YOUR ORDER WILL BE DELIVERED SOON.'
    }
  }
  logout(){
    this.router.navigate(['/login']);
  }

}
