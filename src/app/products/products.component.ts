import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../product.service';
import { Product} from './../product';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  product: Product;
  editableId=null;

  title = 'Produce List';

  constructor(private productService: ProductService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.getProduce();
  }

  getProduce(): void{
    this.productService.getProduce()
    .subscribe(products =>{
      this.products =products
      console.log(this.products)
    });
  }

  newProduce(): void{
    this.productService.newProduce(this.product)
    .subscribe (() => {
      this.product = new Product();
      this.router.navigate(['/', 'getProduce']);
    });
  }

  editProduce(id): void{
    this.productService.editProduce(this.product)
    .subscribe (() => {
      this.router.navigate(['/', 'getProduce']);
    });
  }

  goBack(): void {
    this.getProduce;
  }

  save(id): void {
    let currentproduct: any;
    console.log(id, 'save');
    this.products.forEach(product => {
      if (product.id == id) {
        currentproduct = product;
      }
    });
    this.productService.editProduce(currentproduct)
      .subscribe((resp) => {
        //this.goBack()
        //this.router.navigate(['/', '']);
        console.log('save excuted');
        this.editableId = null;
      });
  }
  confirmation(id): void{
    const r = confirm("Delete the product.");
    if (r == true) {
      this.productService.deleteProduce(id)
      .subscribe(product =>{
        console.log("deleted")
        this.getProduce();
    })
  }
}
}
