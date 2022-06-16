import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UsersService } from '../services/users.service';

const ELEMENT_DATA: User[] = [
  { id: "1", name: 'Rawan', email: 'rawan@gmail.com', role: 'Admin' },
  { id: "2", name: 'Beatrice', email: 'beatrice@gmail.com', role: 'Admin' },
  { id: "3", name: 'Rick', email: 'rick@gmail.com', role: 'User' },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'delete'];
  users = ELEMENT_DATA;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(data => {
        console.log(data);
      })
  }

}
