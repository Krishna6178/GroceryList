import { Component, Injectable, OnInit } from '@angular/core';
import { GroceryObject, GroceryTableService, Items } from '../Service/room.service';
import { SharedService } from '../Service/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent implements OnInit {
  currentUserRoomNumber!: string; // Store the room number of the logged-in user
  indianGroceryItem: string = ''; // Variable to store the Indian grocery item being added
  walmartGroceryItem: string = ''; // Variable to store the Walmart grocery item being added
  indianGroceries: { roomNumber: string, item: string }[] = []; // Array to store Indian groceries
  walmartGroceries: { roomNumber: string, item: string }[] = []; // Array to store Walmart groceries
  groceriesData : any = [];

  allItems:Items={indian:[], walmart:[]};
  indgroc:string[]=[];
  othergroc:string[]=[];
  indianSelected:string[]=[];
  otherSelected:string[]=[];
  selectedIndianOption!:string;
  selectedOtherOption!:string;

  //currentUserRoomNumber:string=''
  constructor( private service : GroceryTableService, private sharedService: SharedService, private router: Router, private dialog: MatDialog, private platformLocation: PlatformLocation) {
  }

  notesField:string='';
  ngOnInit(): void {
    this.sharedService.currentUser.subscribe((user) => {
      this.currentUserRoomNumber = user;
    });
    if (isPlatformBrowser(this.platformLocation)) {
      this.router.navigate(['/dashboard']);
    }
    this.service.getItems().subscribe(
      data=>{
        this.allItems=data as Items;
        if(this.allItems){
          this.indgroc=this.allItems.indian;
          this.othergroc=this.allItems.walmart;
        }
      }
    );

    this.sharedService.getGroceryByRoom(this.currentUserRoomNumber).subscribe((data) => {
      this.groceriesData = data as GroceryObject[];
      this.indianSelected = this.groceriesData.indian;
      this.otherSelected = this.groceriesData.walmart;
      this.notesField=this.groceriesData.note;
    })
  }

  roomObject:GroceryObject= { room: '', indian: [], walmart: [], note:'' };
  displayedColumns:string[]=['item','remove'];
  onClickAdd(){
    console.log("Initial value of selectedIndianOption:", this.selectedIndianOption);
    if(this.selectedIndianOption =='' || this.selectedIndianOption === undefined){
      this.openErrorDialog("Please Select an Item");
      return;
    }

    else if(!this.indianSelected.includes(this.selectedIndianOption)){
      this.indianSelected.push(this.selectedIndianOption);
      this.selectedIndianOption='';
    }
    else{
      this.openErrorDialog("Item is already added");
      this.selectedIndianOption='';
    }
  }
  openErrorDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { errorMessage: errorMessage },
      disableClose: true
    });
  }

  onClickAddOthers(){
    console.log("Initial value of selectedOtherOption:", this.selectedOtherOption);
    if(this.selectedOtherOption =='' || this.selectedOtherOption === undefined){
      this.openErrorDialog("Please Select an Item");
      return;
    }
    else if(!this.otherSelected.includes(this.selectedOtherOption)){
      this.otherSelected.push(this.selectedOtherOption);
      this.selectedOtherOption='';
    }
    else{
      this.openErrorDialog("Item is already added");
      this.selectedOtherOption='';
    }
  }
  getUser(data:any){

    this.currentUserRoomNumber=data as string;
  }

  removeIndianItem(option:string){

    if(this.indianSelected.includes(option)){
      this.indianSelected=this.indianSelected.filter(item=>item!==option);
    }

  }

  removeOtherItem(option:string){

    if(this.otherSelected.includes(option)){
      this.otherSelected=this.otherSelected.filter(item=> item !== option)
    }
  }
  onSubmit(){
    this.roomObject.room=this.currentUserRoomNumber as string;
    this.roomObject.indian=this.indianSelected;
    this.roomObject.walmart=this.otherSelected;
    this,this.roomObject.note=this.notesField;
    this.service.setGroceries(this.roomObject).subscribe((data)=>{})
    this.router.navigate(['/done'])
  }
  logout(){
    this.router.navigate(['/login']);
  }
}