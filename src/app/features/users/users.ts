import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb";
import { DynamicTableComponent } from "../../shared/components/dynamic-table/dynamic-table";
import { UsersService } from './users.service';
import { USER_TABLE_COLUMNS, USER_TABLE_ACTIONS } from './user.table.config';
import { UserModel } from '../../core/models/userModel';
import { TableEvent } from '../../shared/components/dynamic-table/dynamic-table.types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent, DynamicTableComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {
  breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Usuarios' }
  ];

  users: UserModel[] = [];
  columns = USER_TABLE_COLUMNS;
  actions = USER_TABLE_ACTIONS;
  loading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getUsersByTenant().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando usuarios', error);
        this.loading = false;
      }
    });
  }

  onTableAction(event: TableEvent) {
    switch (event.action) {
      case 'delete':
        // Lógica para eliminar usuario
        console.log('Eliminar usuario', event.data);
        break;
      case 'edit':
        console.log('Editar usuario', event.data);
        break;
    }
  }
}