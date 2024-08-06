import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserTableComponent } from './users/ui/user-table/user-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [UserTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
