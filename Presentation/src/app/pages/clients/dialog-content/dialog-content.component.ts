import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Client } from '../../../shared/models/client';
import { ClientsService } from '../clients.service';
@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  public client: Client = new Client();

  profileForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required])
  });

  get register() { return this.profileForm.controls; }

  constructor(private fb: FormBuilder,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<DialogContentComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.client.email = this.register['email'].value;
      this.client.name = this.register['name'].value;
      this.clientsService
        .registerClient(this.client, this.apiUrl)
        .subscribe((res: any) => {
          this.dialogRef.close(true);
        })
    }
    
  }

}
