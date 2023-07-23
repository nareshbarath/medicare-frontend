import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';
import { SellerServiceService } from 'src/app/services/seller/seller-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  editFormValues: any = {};
  category: any = [];

  constructor(
    private categoryService: CategoryServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.editFormValues = {};
    this.categoryService.listCategories().subscribe(
      (res: any) => {
        this.category = res.data;
        if (this.category.length == 0)
          Swal.fire('', 'No data found', 'warning');
      },
      (err) => {
        Swal.fire('', 'No data found', 'warning');
      }
    );
  }

  add(mymodal: any) {
    this.editFormValues = {};
    this.modalService.open(mymodal, { ariaLabelledBy: 'add-category' });
  }

  addCategory(addCategoryForm: any, id?: number) {
    if (id) {
      this.categoryService
        .updateCategory(id, {
          category: addCategoryForm.value.name,
          categoryDescription: addCategoryForm.value.description,
        })
        .subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire('', err.error.message, 'warning');
          }
        );
    } else {
      this.categoryService
        .addCategory({
          category: addCategoryForm.value.name,
          categoryDescription: addCategoryForm.value.description,
        })
        .subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire('', err.error.message, 'warning');
          }
        );
    }
  }

  edit(id: number, mymodal: any) {
    const findEditCategory = this.category.filter((e: any) => e.id == id)[0];
    this.editFormValues = {
      id: findEditCategory.id,
      name: findEditCategory.category,
      description: findEditCategory.categoryDescription,
    };
    this.modalService.open(mymodal, { ariaLabelledBy: 'add-category' });
  }
}
