import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesResponse, fileResponse } from '../constants/photo.constant';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FilesResponse> {
    return this.http.get(`${this.baseUrl}api/getAllImages`);
  }

  getResizedImage(filename: string | undefined, width: number, height: number): Observable<fileResponse> {
    return this.http.get(`${this.baseUrl}api/image?filename=${filename}&width=${width}&height=${height}`);
  }

  uploadFile(file: File): Observable<Object> {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post(`${this.baseUrl}api/upload`, formParams)
  }
}
