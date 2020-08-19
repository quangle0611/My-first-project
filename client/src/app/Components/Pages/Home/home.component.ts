import { Component } from '@angular/core';
import { photoService } from "../../../Services/photo.moduel";

@Component({
    templateUrl: 'home.component.html',
    selector: 'home',
    providers: [photoService]
})
export class homeComponent{
    arrPhoto:any = [];
    constructor( private photoService:  photoService ) {
        photoService.getPhoto().subscribe(data=>{
            console.log(data);
            this.arrPhoto = data;
        });
    }
}