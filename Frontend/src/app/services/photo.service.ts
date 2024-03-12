import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/getAllImages`);
  }

  getImage(imageName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${imageName}`);
  }

  getResizedImage(filename: string, width: number, height: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/image?filename=${filename}&width=${width}&height=${height}`);
  }

  uploadFile(file: File): Observable<any> {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post(`${this.baseUrl}api/upload`, formParams)
  }
}
