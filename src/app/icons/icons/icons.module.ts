import { NgModule } from '@angular/core';
import { IconHome, IconPlusCircle, IconFile, IconBarChart2, IconUsers, IconSettings, IconActivity, IconMail, IconDownload, IconSearch } from 'angular-feather';

const icons = [IconHome, IconPlusCircle, IconFile, IconBarChart2, IconUsers, IconSettings, IconActivity, IconMail, IconDownload, IconSearch];

@NgModule({
  exports: icons
})
export class IconsModule { }
