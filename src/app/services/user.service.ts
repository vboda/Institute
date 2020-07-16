import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL = 'http://localhost:5463';
  constructor(private http: HttpClient) { }

  getUsers(){
    const url = this.SERVER_URL + '/users';
    return this.http.get<any>(url)
    .pipe(
      tap(res => res)
    )
  }

  authenticate(data){
    const url = this.SERVER_URL + '/authenticate';
    return this.http.post<any>(url, data)
    .pipe(
      // catchError(this.handleError())
    );
  }

  updateUser(data){
    const url = this.SERVER_URL + '/updateUser';
    return this.http.post<any>(url, data);
  }

  getCourses(){
    const url = this.SERVER_URL + '/courses';
    return this.http.get<any>(url);
  }

  getRoles(){
    const url = this.SERVER_URL + '/roles';
    return this.http.get<any>(url);
  }

  addUser(data){
    const url = this.SERVER_URL + '/addUser';
    return this.http.post<any>(url, data);
  }
  
  deleteUser(data){
    const url = this.SERVER_URL + '/deleteUser';
    return this.http.post<any>(url, data);
  }

}
