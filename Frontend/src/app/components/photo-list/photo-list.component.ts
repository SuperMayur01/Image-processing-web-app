import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fileResponse } from 'src/app/constants/photo.constant';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  files: fileResponse[] | undefined = [];
  selectedFile!: File;
  fileError: boolean = false;

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.photoService.getAll().subscribe((res) => {
      this.files = res?.files;
    })
  }

  routeToDetailPage(image: fileResponse) {
    sessionStorage.setItem('image', JSON.stringify(image))
    this.router.navigate(['/detail'], { state: { image } });
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type === "image/jpeg") {
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  uploadImage() {
    this.photoService.uploadFile(this.selectedFile).subscribe(()=> {
      this.getAllImages();
    })
  }


}
