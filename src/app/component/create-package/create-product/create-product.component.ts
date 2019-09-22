import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductService} from '../../../service/product/product.service';
import {ProductCategory, ProductCategoryService} from '../../../service/productCategory/product-category.service';
import {Content, ContentService} from '../../../service/content/content.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  wantAdd: boolean;
  @Input('packId') pack: string;
  @Output() productsAdded = new EventEmitter();

  productList: Array<Product> = new Array<Product>();
  productCategories: Array<ProductCategory>;
  content: Content;

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService, private contentService: ContentService,
              private router: Router) { }

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
    this.content =  new Content(newDate);

    //stworzenie zawartosci w bazie
    this.contentService.saveContent(this.content, this.pack).subscribe(
      results => {
        this.succefullResponseContent(results);
        //zapisanie produktow w bazie i powiazanie ich z zawartoscia
        this.productService.saveAll(this.productList, this.content.id).subscribe(
          next => {
            this.succefullResponseProducts(next);
            this.productsAdded.emit(true);
            this.router.navigate(['/createPackage']);
          }
        );
      }
    );
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

  succefullResponseProducts(response) {
    this.productList = response;
  }

  succefullResponseContent(response) {
    this.content = response;
  }

}
