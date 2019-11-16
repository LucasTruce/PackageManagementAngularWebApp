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

  sender: Sender = new Sender('', '', '', '', '', '', '', '', new Package(0,0,0, ''), '');
  receiver: Receiver = new Receiver('', '', '', '', '', '', '', '', '');

  @Input('pack') pack: Package; // from create-package component
  @Output() senderAdded = new EventEmitter();
  @Output() receiverAdded = new EventEmitter();
  constructor(private senderService: SenderService, private receiverService: ReceiverService, private router: Router, private userDetailsService: UserDetailsService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.userDetailsService.getOne(this.auth.getLogin()).subscribe(
      response => {
          this.handleSenderData(response);
      }
    );
  }

  handleSenderData(response) {
    this.sender = response;
    this.sender.email = this.auth.getLogin();
    this.sender.id = '';
  }

  createSenderReceiver() {
    this.senderAdded.emit(this.sender);
    this.receiverAdded.emit(this.receiver);
  }

}
