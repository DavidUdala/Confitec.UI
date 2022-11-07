import { UserListDto } from './../../interface/userListDto';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { UserListDataSource } from './user-list-datasource';
import Swal  from 'sweetalert2'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserListDto>;
  dataSource: UserListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Nome', 'Sobrenome', 'Email', 'Data Nascimento', 'Escolaridade', 'Editar', 'Apagar', ];
  // 'Sobrenome', 'Data de Nascimento', 'Educacão'

  users: UserListDto[] = [];

  constructor(private service : UserService, private router: Router) {
    this.dataSource = new UserListDataSource();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.service.getAll().subscribe((response) => {
      this.table.dataSource = response;
    })
  }

  Remove(id : any){
      this.service.delete(id).subscribe((response) =>{
        Swal.fire({
          title: `Usuário ${response.name} foi excluído com sucesso!`,
          confirmButtonText: 'OK',
          icon:'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/search']);
          }
        })
      });
  }

  Editar(id : any){
     this.router.navigate([`/edit/${id}`]);
  }
}
