import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class photoService{
    constructor( private http: HttpClient ) {}
    
    getPhoto() {

        let options = {
            headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
        }

        return this.http.post("http://localhost:3000/api/photo", options);
        
    }
} 