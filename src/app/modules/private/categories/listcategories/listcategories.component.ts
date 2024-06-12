import { Component, OnInit } from '@angular/core';
import { CategoriesResponse, CategoryResponse } from '@app/interfaces/category.interface';
import { AuthService } from '@app/services/auth.service';
import { CategoriesService } from '@app/services/categories.service';

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrl: './listcategories.component.scss',
})
export class ListcategoriesComponent implements OnInit {
  categories?: CategoryResponse[];

  constructor(
    private categoriesService: CategoriesService,
    private test: AuthService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategory().subscribe((res) => {
      this.categories = res.data;
      console.log(this.categories);

    });
  }
}
