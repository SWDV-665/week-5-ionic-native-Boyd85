import { Component } from '@angular/core';
import { NavController, Item } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public dataService: GroceriesServiceProvider,  public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }

  loadItems(){
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Removing " + item.name + "...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index)
  }

  shareItem(item, index) {
    const toast = this.toastCtrl.create({
      message: "Sharing Item -  " + index + "...",
      duration: 3000
    });

    toast.present();

    let message = 'Grocery Item - Name: ' + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      
    }).catch((error) => {
      console.log("Error while sharing ", error)
    });
  }


  addItem(){
    this.inputDialogService.showPrompt();
  }

  editItem(item, index){
    console.log("Edit Item - ", item, index)
    const toast = this.toastCtrl.create({
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);

  }


  }


