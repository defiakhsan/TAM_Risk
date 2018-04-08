import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { ReminderComponent } from './reminder.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ReminderComponent,
  ],
})
export class ReminderModule { }
