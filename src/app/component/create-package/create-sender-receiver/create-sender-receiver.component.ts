import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Package, PackageService} from '../../../service/package/package.service';
import {CreatePackageComponent} from '../create-package.component';
import {Sender, SenderService} from '../../../service/sender/sender.service';
import {Receiver, ReceiverService} from '../../../service/receiver/receiver.service';
import {Router} from '@angular/router';
import {UserDetailsService} from '../../../service/user-details/user-details.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-create-sender-receiver',
  templateUrl: './create-sender-receiver.component.html',
  styleUrls: ['./create-sender-receiver.component.css']
})
export class CreateSenderReceiverComponent implements OnInit {

  sender: Sender = new Sender('', '', '', '', '', '', '');
  receiver: Receiver = new Receiver('', '', '', '', '', '', '');

  @Input('packId') pack: string; // from create-package component
  @Output() senderReceiverAdded = new EventEmitter();

  constructor(private senderService: SenderService, private receiverService: ReceiverService, private router: Router, private userDetailsService: UserDetailsService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.userDetailsService.getOne(this.auth.getLogin()).subscribe(
      response => {
          this.handleSenderData(response);
      }
    );
    console.log(this.pack);
  }

  handleSenderData(response) {
    this.sender = response;
  }
  createSenderReceiver() {
    this.senderService.save(this.sender, this.pack).subscribe(
      response => {
        this.receiverService.save(this.receiver, this.pack).subscribe(
          res => {
            this.senderReceiverAdded.emit(true);
            this.router.navigate(['/addPackage']);
          }
        );
      }
    );
  }

}
