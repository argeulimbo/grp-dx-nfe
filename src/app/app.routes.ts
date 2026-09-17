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
import { ListaNotaFiscalComponent } from './pages/nota-fiscal/lista-nota-fiscal.component/lista-nota-fiscal.component';
import { CriarNotaFiscalComponent } from './pages/nota-fiscal/criar-nota-fiscal/criar-nota-fiscal';
import { ListaClienteComponent } from './pages/clientes/lista-cliente.component/lista-cliente.component';
import { CriarCliente } from './pages/clientes/criar-cliente/criar-cliente';
import { ListaProdutoComponent } from './pages/produtos/lista-produto.component/lista-produto.component';
import { CriarProduto } from './pages/produtos/criar-produto/criar-produto';
import { EditarProdutoComponent } from './pages/produtos/editar-produto/editar-produto';
import { EditarClienteComponent } from './pages/clientes/editar-cliente/editar-cliente';
import { EditarNotaFiscalComponent } from './pages/nota-fiscal/editar-nota-fiscal/editar-nota-fiscal';

export const routes: Routes = [
  {
    path: 'nfe/produtos',
    component: ListaProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nfe/produtos/criar',
    component: CriarProduto,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nfe/produtos/edit/:codigo',
    component: EditarProdutoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nfe/clientes',
    component: ListaClienteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'nfe/clientes/criar',
    component: CriarCliente,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nfe/clientes/edit/:codigo',
    component: EditarClienteComponent,
    canActivate: [AuthGuardService]
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
    path: 'nfe/notas/edit/:numero',
    component: EditarNotaFiscalComponent,
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
