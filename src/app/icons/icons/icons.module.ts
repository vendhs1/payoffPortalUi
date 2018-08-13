import { NgModule } from '@angular/core';
import { IconHome, IconPlusCircle, IconFile, IconBarChart2, IconUsers, IconSettings, IconActivity, IconMail } from 'angular-feather';

const icons = [IconHome, IconPlusCircle, IconFile, IconBarChart2, IconUsers, IconSettings, IconActivity, IconMail];

@NgModule({
  exports: icons
})
export class IconsModule { }
