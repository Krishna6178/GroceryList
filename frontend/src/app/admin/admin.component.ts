import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GroceryObject, Items } from '../Service/room.service';
import { GroceryTableService } from '../Service/room.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';
import { Item } from '../Service/user.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';



export interface Notes{
  id:string;
  note:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  indianItems: [string, string[], completed: boolean][] = [];
  otherItems: [string, string[], completed: boolean][] = [];
  getData: GroceryObject[] = [];

  constructor(private grocery : GroceryTableService, private router: Router, private cdr: ChangeDetectorRef, private dialog: MatDialog ) {}

  IndiantoAdd:string[]=[];
  OtherToAdd:string[]=[];
  itemtoAdd:string='';
  itemtoOther:string='';
  item:Item={name:''};
  itemsToPost:Items={indian:[],walmart:[]};
  ngOnInit(): void {
    window.onload = () => {
      this.router.navigate(['/admin']);
    };
    this.grocery.getGroceries().pipe(take(1))
    .subscribe((data)=>{
        this.getData = data as GroceryObject[];
        this.cdr.detectChanges();
        this.process();
    })
    this.getItems();
  }

  AddToIndian(){
    // this.item.name=this.itemtoAdd;
    if(!this.IndiantoAdd.includes(this.itemtoAdd.toLowerCase()) && this.itemtoAdd !== ''){
    this.IndiantoAdd.push(this.itemtoAdd.toLowerCase());
   
    }
    this.itemtoAdd='';

  }
  AddToOthers(){
    if(!this.OtherToAdd.includes(this.itemtoOther.toLowerCase()) && this.itemtoOther !== ''){
      this.OtherToAdd.push(this.itemtoOther.toLowerCase());
     
      }
      this.itemtoOther='';
  
  }

  removeIndianAddedItem(data:string){
   
    if(this.IndiantoAdd.includes(data)){
      this.IndiantoAdd=this.IndiantoAdd.filter(item=>item!==data);
     
    }
  }

  removeOtherAddedItem(data:string){
   
    if(this.OtherToAdd.includes(data)){
      this.OtherToAdd=this.OtherToAdd.filter(item=>item!==data);
     
    }
  }
  saveItems(){
    if (this.IndiantoAdd.length === 0 && this.OtherToAdd.length === 0) {
      this.openErrorDialog("Both Indian and Walmart items lists are empty. Please add items before saving.");
      return;
    }
    this.itemsToPost={
      indian:this.IndiantoAdd,
      walmart:this.OtherToAdd
    }
    this.grocery.setItems(this.itemsToPost).subscribe();
    this.openErrorDialog("Groceries are added successfully and redirected to the login Page");
    this.router.navigate(['/login']);
  }

  openErrorDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { errorMessage: errorMessage },
      disableClose: true
    });
  }

  getItems(){
    this.grocery.getItems().subscribe(
      data=>{
        this.itemsToPost=data as Items;
        console.log(this.itemsToPost);
        if(this.itemsToPost){
          this.IndiantoAdd = this.itemsToPost.indian;
          this.OtherToAdd = this.itemsToPost.walmart;
        }
      }
    );
  }

  notesToSee:Notes[]=[];
  noteObj:Notes={id:'',note:''};
  process() {
    for (const grocery of this.getData) {
      for (const indianItem of grocery.indian) {
        const existingItemIndex = this.indianItems.findIndex(([item]) => item === indianItem);
        if (existingItemIndex !== -1) {
          this.indianItems[existingItemIndex][1].push(grocery.room);
        } else {
          const idsToAdd: string[] = [];
          idsToAdd.push(grocery.room);
          this.indianItems.push([indianItem, idsToAdd, false]);
        }
      }

      for (const otherItem of grocery.walmart) {
        const existingItemIndex = this.otherItems.findIndex(([item]) => item === otherItem);
        if (existingItemIndex !== -1) {
          this.otherItems[existingItemIndex][1].push(grocery.room);
        } else {
          const idsToAdd: string[] = [];
          idsToAdd.push(grocery.room);
          this.otherItems.push([otherItem, idsToAdd, false]);
        }
      }
     if(grocery.note.length!==0){
      this.noteObj.id=grocery.room;
      this.noteObj.note=grocery.note;
      this.notesToSee.push(this.noteObj);
      this.noteObj={id:'',note:''};
     }
    }
  }

  markAsCompleted(item: [string, string[], boolean]): void {
    item[2] = true;
  }

  markAsIncomplete(item: [string, string[], boolean]){

    item[2]=false;
  }
  
  clearAll() {
    this.grocery.deleteGroceries().subscribe(
      () => {
        // Handle success response if needed
        
      },
      (error) => {}
    );
    this.indianItems=[];
    this.otherItems=[];
    this.router.navigate(['/done']);
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px', // Adjust width according to your design
      data: 'Are you sure you want to clear all groceries?',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If 'Yes' is clicked
        this.clearAll();
      } else {
        // If 'No' is clicked or the dialog is closed without making a choice
      }
    });
  }
  
  logout(){
    this.router.navigate(['/login']);
  }
}
