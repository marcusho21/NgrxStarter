import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside/click-outside.directive';
import { UsersFacade } from '../../data/users.facade';
import { User } from '../../models/user';
import { UserTableRowComponent } from '../user-table-row/user-table-row.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    AsyncPipe,
    UserTableRowComponent,
    ClickOutsideDirective,
    LoaderComponent,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  #userFacade = inject(UsersFacade);
  #statusMessage = toSignal(this.#userFacade.statusMessage$);
  users = toSignal(this.#userFacade.users$);
  status = computed(() => this.#statusMessage()?.status);
  message = computed(() => this.#statusMessage()?.message);
  isLoading = toSignal(this.#userFacade.isLoading$);
  tableRowsRef = viewChildren(UserTableRowComponent);

  onEditing(isEditing: boolean) {
    if (isEditing) {
      this.#userFacade.clearMessage();
    }
  }

  onSaveUser(user: User) {
    this.#userFacade.updateUser(user);
  }

  onClickOutside() {
    this.tableRowsRef().forEach((row) => row.isEditing.set(false));
  }
}
