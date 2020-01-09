import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRegistrationModel} from "~/app/models/user-registration.model";
import {Observable} from "rxjs";
import {environment} from "~/environments/environment.tns";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

    private apiDomain: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public registerUser(data: {email: string, password: string}): Observable<string> {
        return this.http.post(this.apiDomain + 'authentication/client_create',
            {...data, shared: false}, {responseType: 'text'}).pipe(
            map(data => data)
        );
    }
}
