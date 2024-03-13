import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fileResponse, fileResponseObject } from 'src/app/constants/photo.constant';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {

  image: fileResponse;
  height: string = '';
  width: string = '';
  resizedImage!: fileResponse;
  hasHeightError: boolean = true;
  hasWidthError: boolean = true;

  formFieldErrors = {
    height: "",
    width: "",
  }

  constructor(private router: Router, private photoService: PhotoService) {
    this.image = JSON.parse(sessionStorage.getItem('image') || '');
  }

  ngOnInit(): void {
  }

  validateHeight() {
    if (!this.height || isNaN(Number(this.height)) || Number(this.height) <= 0) {
      this.hasHeightError = true;
      this.formFieldErrors.height = "Please provide a valid height"
    } else {
      this.hasHeightError = false;
      this.formFieldErrors.height = ""
    }
  }

  validateWidth() {
    if (!this.width || isNaN(Number(this.width)) || Number(this.height) <= 0) {
      this.hasWidthError = true;
      this.formFieldErrors.width = "Please provide a valid width"
    } else {
      this.hasWidthError = false;
      this.formFieldErrors.width = ""
    }
  }

  submit() {
    if (this.hasWidthError || this.hasHeightError){
      return;
    } else {
      this.photoService.getResizedImage(this.image.name, Number(this.width), Number(this.height)).subscribe((res)=> {
        this.resizedImage = res;
      });
    }
  }

}
