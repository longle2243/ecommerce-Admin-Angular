import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcategoriesComponent } from './listcategories/listcategories.component';

const routes: Routes = [{ path: '', component: ListcategoriesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
