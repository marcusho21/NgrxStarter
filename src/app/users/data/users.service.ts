import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { GetUserResponse, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly #ENDPOINT = `${environment.api}/users`;

  #http = inject(HttpClient);

  getAllUsers() {
    return this.#http.get<GetUserResponse>(this.#ENDPOINT);
  }

  updateUser(user: User) {
    return this.#http.put<User>(`${this.#ENDPOINT}/${user.id}`, user);
  }
}
