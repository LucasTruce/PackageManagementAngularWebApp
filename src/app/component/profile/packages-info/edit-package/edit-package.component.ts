import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Package, PackageService} from '../../../../service/package/package.service';
import {ProductCategory, ProductCategoryService} from '../../../../service/productCategory/product-category.service';
import {Product, ProductService} from '../../../../service/product/product.service';
import {SenderService} from '../../../../service/sender/sender.service';
import {ReceiverService} from '../../../../service/receiver/receiver.service';
import {Code, CodeService} from '../../../../service/code/code.service';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {Content, ContentService} from '../../../../service/content/content.service';
import {error} from 'util';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {

  id: string;
  productsAdd: boolean = false;
  productsWasEdited: boolean = false;

  package: Package = new Package(0, 0, 0, '', '', '', '', '', '', '', '', new Code(''), '');

  removeItems: Array<any> = new Array<any>();
  productCategories: Array<ProductCategory> = new Array<ProductCategory>();

  constructor(private authService: AuthenticationService, private route: ActivatedRoute,
              private packageService: PackageService,
              private productCategoryService: ProductCategoryService,
              private senderService: SenderService,
              private receiverService: ReceiverService,
              private productService: ProductService,
              private codeService: CodeService,
              private router: Router,
              private contentService: ContentService) {}





  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });


    this.packageService.findById(this.id).subscribe(
      response => {
        this.successfulResponsePackage(response);
        this.productCategoryService.getAll().subscribe(
          results => {
            this.successfulCategory(results);
            //if(this.authService.getLogin() != this.package.users[0].login || this.package.packageStatus.name != "W oczekiwaniu na kuriera"){
              //this.router.navigate(['profile/packages-info']);
            //}
          }
        );
      },
      error => {
        if(error.status == 404){
          this.router.navigate(['profile/packages-info']);
        }
      }
    );
  }

  updatePackage() {
    this.packageService.update(this.package).subscribe(
      results => {
        this.senderService.update(this.package.sender).subscribe(
          response => {
            this.receiverService.update(this.package.recipient).subscribe(
              next => {
                if(this.productsWasEdited === true) {
                  if (this.removeItems.length > 0) {
                    this.productService.deleteAll(this.removeItems).subscribe();
                  }
                  //dodac produkt
                  for(let product of this.package.content.products){
                      console.log('przed: ' + product.code.filePath);
                      product.code.filePath = product.name;
                      console.log('po' + product.code.filePath);
                  }
                  this.productService.saveAll(this.package.content.products).subscribe(
                    res => {
                      this.successfulProducts(res);
                        this.contentService.saveContent(this.package.content).subscribe(
                          temp => {
                              this.package.content = temp;
                            this.router.navigate(['/profile/packages-info']);
                          }
                        );
                    }
                  );
                }
                else{
                  this.router.navigate(['/profile/packages-info']);
                }
              }
            );
          }
        );
      }
    );
  }

  deleteProduct(product, index) {
    if(product.id != '') {
      this.removeItems.push(product);
    }

    this.package.content.products.splice(index, 1);
    console.log(this.package.content.products);
  }

  addProduct() {
    if(this.package.content == null) {
      this.package.content = new Content('','', '0', new Array<Product>())
    }
    this.package.content.products.push(new Product('', 0 ,'', '', new ProductCategory('',''), new Code('')));
    console.log(this.package.content.products);
  }

  editProduct(){
    this.productsAdd = true;
  }

  editProductEnd(){
    this.productsAdd = false;
    this.productsWasEdited = true;
  }

  customCompareCategory(o1: any, o2: any) {
    return JSON.stringify(o1) == JSON.stringify(o2);
  }

  successfulResponsePackage(response) {
    this.package = response;
  }

  successfulCategory(response) {
    this.productCategories = response;
  }

  successfulProducts(response) {
    this.package.content.products = response;
  }
}
