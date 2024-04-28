import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  roomNumber!: string;
  password!: string;
  invalidLogin: boolean = false;
  user:string='';
  pass:string='';
  hide = true;
onReset(){

  this.user='';
  this.pass=''

}
@Output() sendUser:EventEmitter<String>=new EventEmitter();
onSubmit(){
  if(this.user === '9106' && this.pass==='Avana9106' || this.user === '4106' && this.pass==='AvanaF4106' || 
     this.user === '4208' && this.pass==='Avan4208' || this.user === '3108' && this.pass==='Avanaa3108' || this.user === '6106' && this.pass==='Wood6106'){
      this.invalidLogin=false;
      this.sendUser.emit(this.user);
      this.sharedService.updateUser(this.user);
      this.router.navigate(['/dashboard']);
     }
     else if(this.user === 'admin' && this.pass ==='Adminall@5'){
      this.router.navigate(['/admin']);
     }
     else{
     this.openErrorDialog("Please enter correct credentials");
     this.user='';
     this.pass='';
      this.invalidLogin = true;
     }

}
openErrorDialog(errorMessage: string): void {
  const dialogRef = this.dialog.open(ErrorDialogComponent, {
    width: '250px',
    data: { errorMessage: errorMessage },
    disableClose: true
  });
}
  constructor(private router: Router,private sharedService: SharedService,private snackBar: MatSnackBar, private dialog: MatDialog) {}
}
