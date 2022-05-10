import { ApiService } from './../api.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
  barcodeValue;
  scanning = false;
  has_scanned = false;

  product: any;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {}

  scan() {
    this.scanning = true;
    this.barcodeScanner.start().catch(async (err) => {
      this.scanning = false;
      const alert = await this.alertController.create({
        header: 'Der opstod en fejl',
        message: 'Der opstod en fejl ved scanning!',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  stopScan() {
    this.barcodeScanner.stop();
    this.scanning = false;
  }

  onValueChanges(result) {
    this.stopScan();
    this.findProductFromBarcode(result.codeResult.code);
  }

  findProductFromBarcode(barcode: string) {
    this.barcodeValue = barcode;
    this.product = null;
    this.has_scanned = true;

    this.apiService.getProduct(barcode).subscribe((data) => {
      if (data.product) {
        this.product = data.product;
      }
    });
  }

  onStarted(started) {
    console.log(started);
  }
}
