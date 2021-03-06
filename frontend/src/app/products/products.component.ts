import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  page: number;
  limit: number;
  products: Promise<Product[]>;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts(0, 20);
  }
  async onLike(product: Product) {
    await this.productService.like(product.id);
    product.liked = !product.liked;
  }

  onPageChange($event: PageEvent) {
    this.page = $event.pageIndex;
    this.limit = $event.pageSize;
    this.products = this.productService.getProducts(this.page, this.limit);
  }
}
