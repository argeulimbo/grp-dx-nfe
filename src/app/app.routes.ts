import { Routes } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ListaNotaFiscalComponent } from './pages/nota-fiscal/lista-nota-fiscal.component/lista-nota-fiscal.component';
import { CriarNotaFiscalComponent } from './pages/nota-fiscal/criar-nota-fiscal/criar-nota-fiscal';

export const routes: Routes = [
  {
    path: 'nfe/clientes',
    component: ClientesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'nfe/notas',
    component: ListaNotaFiscalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nfe/notas/criar',
    component: CriarNotaFiscalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
