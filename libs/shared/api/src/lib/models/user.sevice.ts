import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';


@Injectable({
  providedIn: 'root',
})
export class UserService {
    users: IUserInfo[] = [
        {
            _id: '1',
            name: 'Coen de Kruijf',
            emailAddress: 'kruijf.coen@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Guest,
            gender: UserGender.Male,
            isActive: true,
            position: 'RB,RW,CM',
            password: 'password'
        },
        {
            _id: '2',
            name: 'Thom hendricks',
            emailAddress: 'T.hendricks@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            position: 'Support',
            password: 'password'
        },
        {
            _id: '2',
            name: 'Drik Stabel',
            emailAddress: 'D.Stabel@gmail.com',
            profileImgUrl: 'url',
            role: UserRole.Admin,
            gender: UserGender.Male,
            isActive: true,
            position: 'GK',
            password: 'password'
        }
    ];
  constructor() {
    console.log('Service constructor aangeroepen');
  }

  getUsers(): IUserInfo[] {
    console.log('getUsers aangeroepen');
    return this.users;
  }

  getUsersAsObservable(): Observable<IUserInfo[]> {
    console.log('getUsersAsObservable aangeroepen');
    // 'of' is een rxjs operator die een Observable
    // maakt van de gegeven data.
    return of(this.users);
  }

  getUserById(_id: string): IUserInfo {
    console.log('getUserById aangeroepen');
    return this.users.filter((user) => user._id === _id)[0];
  }
}
