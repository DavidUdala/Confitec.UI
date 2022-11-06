import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { UserListDataSource } from './user-list-datasource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: UserListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Nome', 'Sobrenome', 'Email', 'Data Nascimento', 'Escolaridade'];
  // 'Sobrenome', 'Data de Nascimento', 'Educacão'

  users: User[] = [];

  constructor(private service : UserService) {
    this.dataSource = new UserListDataSource();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.service.getAll().subscribe((response) => {
      this.table.dataSource = response;
    })
  }
}
