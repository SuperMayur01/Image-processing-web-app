import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

const routes: Routes = [
  {
    path: '', component: PhotoListComponent
  },
  {
    path: 'detail', component: PhotoDetailComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }