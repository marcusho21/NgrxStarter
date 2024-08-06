import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EscapeDirective } from '../../../shared/directives/escape/escape.directive';
import { EditableCellComponent } from '../editable-cell/editable-cell.component';
import { User } from './../../models/user';

@Component({
  selector: 'tr[app-user-table-row]',
  standalone: true,
  imports: [ReactiveFormsModule, EditableCellComponent],
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [EscapeDirective],
})
export class UserTableRowComponent {
  #nnfb = inject(NonNullableFormBuilder);

  user = input.required<User>();
  formId = computed(() => `user-form-${this.user().id}`);
  isEditing = signal(false);

  userForm = this.#nnfb.group({
    id: [-1, [Validators.required, Validators.min(0)]],
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  saveUser = output<User>();
  editing = output<boolean>();

  get id() {
    return this.userForm.controls.id;
  }

  get name() {
    return this.userForm.controls.name;
  }

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

  constructor() {
    effect(() => {
      this.#patchFormValue(this.user());
    });
  }

  @HostListener('escape')
  onCancel() {
    this.#patchFormValue(this.user());
    this.isEditing.set(false);
  }

  onEdit() {
    this.isEditing.set(true);
    this.editing.emit(true);
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const userData = this.userForm.getRawValue();
    this.saveUser.emit(userData);
    this.isEditing.set(false);
  }

  #patchFormValue(user: User) {
    const { id, name, username, email } = user;
    this.userForm.patchValue({ id, name, username, email });
  }
}
