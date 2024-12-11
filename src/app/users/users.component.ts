import {Component, OnInit} from '@angular/core';
import {IUser} from './user.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  initialUsers: IUser[] = [];
  users: IUser[] = [];
  visibleUsers: IUser[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  sortField: keyof IUser | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  numberOfPages: number[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<{ users: IUser[] }>('https://dummyjson.com/users')
      .subscribe((data: { users: IUser[] }) => {
          this.initialUsers = data.users
            .map(({firstName, lastName, age, address}) => {
              return {
                id: Math.random() * 100,
                firstName,
                lastName,
                age,
                address,
              } as IUser;
            });
          this.users = this.initialUsers.map(user => ({...user}));
          this.updateVisibleUsers();
        }
      );
  }

  updatePageNumbers() {
    this.numberOfPages = Array.from({length: this.users.length / this.itemsPerPage}, (_, i) => i + 1);
  }

  searchUsers() {
    const query = this.searchQuery.toLowerCase();
    this.users = this.initialUsers.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query)
    );
    this.sortAndPaginate();
  }

  sortUsers(field: keyof IUser) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortAndPaginate();
  }

  private sortAndPaginate() {

    if (this.sortField) {
      this.users.sort((a, b) => {
        const valueA = a[this.sortField as keyof IUser];
        const valueB = b[this.sortField as keyof IUser];
        const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    this.updateVisibleUsers();
  }

  updateVisibleUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleUsers = this.users.slice(startIndex, endIndex);
    this.updatePageNumbers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateVisibleUsers();
  }

  trackByFn(index: number, user: IUser) {
    return user.id;
  }
}
