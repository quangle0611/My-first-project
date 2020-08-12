import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { homeComponent } from "./Components/Pages/Home/home.component";
import { detailComponent } from "./Components/Pages/detail/detail.component";
import { listPhotoInAlbumComponent } from "./Components/Pages/listPhotoInAlbum/listPhotoInAlbum.component";
import { myAlbumComponent } from "./Components/Pages/myAlbum/myAlbum.component";
import { myPhotoComponent } from "./Components/Pages/myPhoto/myPhoto.component";
import { registerComponent } from "./Components/Pages/register/register.component";

const routes: Routes = [
  {path: 'detail', component:detailComponent },
  {path: 'listPhotoInAlbum', component: listPhotoInAlbumComponent },
  {path: 'myAlbum', component: myAlbumComponent },
  {path: 'myPhoto', component: myPhotoComponent },
  {path: 'register', component: registerComponent },
  {path: '**', component: homeComponent },
];

@NgModule({
  declarations: [
    homeComponent,
    detailComponent,
    listPhotoInAlbumComponent,
    myAlbumComponent,
    myPhotoComponent,
    registerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
