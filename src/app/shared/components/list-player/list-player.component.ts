import { Component, Input } from '@angular/core';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-list-player',
  standalone: false,
  
  templateUrl: './list-player.component.html',
  styles: ``
})
export class ListPlayerComponent {
  @Input({ required: true }) players!: User[];
}
