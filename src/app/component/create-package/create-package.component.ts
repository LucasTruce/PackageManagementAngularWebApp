import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../service/package/package.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {Code, CodeService} from '../../service/code/code.service';
import {Sender, SenderService} from '../../service/sender/sender.service';
import {Receiver, ReceiverService} from '../../service/receiver/receiver.service';
import {Product, ProductService} from '../../service/product/product.service';
import {Content, ContentService} from '../../service/content/content.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  package: Package = new Package(0, 0, 0, '');
  code: Code = new Code('');
  error: object = {};

  packageAdded: boolean = false;
  senderAdded: Sender = null;
  receiverAdded: Receiver= null;
  productsAdded: Array<Product>;
  contentAdded: Content= null;
  wantAddProducts: boolean = false;

  summary: boolean = false;

  constructor(private packageService: PackageService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private codeService: CodeService,
              private senderService: SenderService,
              private receiverService: ReceiverService,
              private contentService: ContentService,
              private productService: ProductService) { }

  ngOnInit() {}

  createPackage(){
    this.packageAdded = true;
  }

  handleProductsResponse(ev) {
    this.productsAdded = ev;
    this.package.content = this.contentAdded;
  }

  handleSenderResponse(ev) {
    this.senderAdded = ev;
    this.package.sender = ev;
  }

  handleReceiverResponse(ev) {
    this.receiverAdded = ev;
    this.package.recipient = ev;
  }

  handleContentResponse(ev) {
    this.contentAdded = ev;
  }

  handleDontAddProducts(ev) {
    this.wantAddProducts = ev;
  }

  addToDatabase() {
   this.senderService.save(this.senderAdded).subscribe(  //dodawanie nadawcy
      results => {
        this.package.sender = results;
        this.receiverService.save(this.receiverAdded).subscribe( //dodawanie odbiorcy
          res => {
            this.package.recipient = res;
            if(this.wantAddProducts == false) {  //przypadek gdzie uzytkownik chce dodać towary
              this.productService.saveAll(this.productsAdded).subscribe( //dodawanie produktow (produkt musi mieć kod)
                nx => {
                  this.successfulResponseProducts(nx);
                  this.contentService.saveContent(this.contentAdded).subscribe( //dodawanie zawartosci (zawartosc musi miec produkty)
                  next => {
                    this.successfulResponseContent(next);
                    this.packageService.save(this.package, this.authenticationService.getLogin()).subscribe(  //dodawanie paczki (paczka musi mieć kod)
                      response => {
                        this.successfullResponsePackage(response);
                        this.router.navigate(['/profile/packages-info']);
                      }
                      );});});
            }
            else { //przypadek gdy uzytkownik nie chce dodać towarów (wstawiamy sama paczke, bez content'u i towarow)
              this.package.code = new Code('');
              this.packageService.save(this.package, this.authenticationService.getLogin()).subscribe(
                respo => {
                  this.successfullResponsePackage(respo);
                  this.router.navigate(['/profile/packages-info']);
                }
              );
            }
          }
          );
      }
      );
  }


  successfulResponseContent(response) {
    this.package.content = response;
    this.package.code = new Code('');
  }
  successfulResponseProducts(response) {
    this.productsAdded = response;
    this.contentAdded.products = this.productsAdded;
  }

  successfullResponsePackage(response) {
    this.package = response;
  }


}
