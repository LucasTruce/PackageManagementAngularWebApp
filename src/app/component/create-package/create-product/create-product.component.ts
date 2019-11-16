import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductService} from '../../../service/product/product.service';
import {ProductCategory, ProductCategoryService} from '../../../service/productCategory/product-category.service';
import {Content, ContentService} from '../../../service/content/content.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {Code, CodeService} from '../../../service/code/code.service';
import {Package} from '../../../service/package/package.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  wantAdd: boolean = false;
  @Input('pack') pack: Package;
  @Output() productsAdded = new EventEmitter();
  @Output() contentAdded = new EventEmitter();
  @Output() wantAddProducts = new EventEmitter();

  productList: Array<Product> = new Array<Product>();
  productCategories: Array<ProductCategory>;
  content: Content;
  codes: Array<Code> = new Array<Code>();

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  ngOnInit() {
    this.productCategoryService.getAll().subscribe(
      response => {
        this.getCategories(response);
      }
    );
    //interval(1000).subscribe(val => console.log(this.productList));
  }

  createContentProduct() {
    //usuniecie poprzedniego id
    for(let i = 0; i < this.productList.length; i++){
      this.productList[i].id = '';
    }
    //format daty
    const format = 'yyyy-MM-dd HH:mm:ss';
    const myDate = new Date().getTime();
    const newDate = formatDate(myDate, format, 'en-US');
    this.content = new Content(newDate);

    this.contentAdded.emit(this.content);

    for (let product of this.productList) {
      product.code = new Code(product.name);
    }

    this.productsAdded.emit(this.productList);
  }

  wantAdd2() {
    this.wantAddProducts.emit(true);
  }

  addProduct() {
    this.productList.push(new Product('', 0, '', new Date().getTime() +'')); //trzeba podać jakieś ID by po usunięciu i dodaniu nowego produktu nie zerowały się nazwy !!!
  }

  deleteProductFromContent(index){
    this.productList.splice(index, 1);
  }

  getCategories(response) {
    this.productCategories = response;
  }

}
