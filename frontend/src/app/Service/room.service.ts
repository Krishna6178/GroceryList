import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface GroceryObject{
    room:string;
    indian:string[];
    walmart:string[];
    note:string;
}

export interface Items{
    indian:string[];
    walmart: string[];
}

@Injectable()
export class GroceryTableService {
    //url="http://54.82.78.127:3001/api/grocery";
    url="http://3.91.56.77:3001/api/grocery";
    constructor(private http: HttpClient){
    }
    setGroceries(obj:GroceryObject)  {
        return this.http.post(this.url,obj);
    }
    getGroceries () {
        return this.http.get(this.url);
    }

    deleteGroceries(){
        return this.http.delete(this.url);
    }

    getItems(){
        return this.http.get(this.url+'/admin');
    }

    setItems(obj:Items){
        return this.http.post(this.url+'/admin', obj);
    }
}