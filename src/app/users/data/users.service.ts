import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { GetUserResponse, User } from '../models/user';
import { map } from 'rxjs';

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

  updateAllUser(users: User[]) {
    return this.#http.post<User[]>(`${this.#ENDPOINT}`, users).pipe(
      map((res) => {
        const users = Object.values(res).filter(
          (data) => typeof data === 'object'
        );
        return users;
      })
    );
  }
}
