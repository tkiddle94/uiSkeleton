import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { BreatheDetailPage } from '../../modals/breathe-detail/breathe-detail';
import { HelpPage } from '../../modals/help/help';
import { WalkthroughPage } from '../../modals/walkthrough/walkthrough';
import { LoginPage } from '../login/login';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the BreathePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breathe',
  templateUrl: 'breathe.html',
})
export class BreathePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  showTutorial: boolean = false;
  showFab: boolean= true;
  public breaths: number = 0;
 
  ionViewDidLoad() {
    const timer = TimerObservable.create(6000, 6000).subscribe(t => { this.breaths = t; });
  }

  ionViewDidChange() {
    this.breaths = 0;
  }

  dismissPressed() {
    this.showTutorial = false;
    this.showFab = true;
  }

  onHelp() {
    let modal = this.modalCtrl.create(HelpPage);
    modal.present();
  }

  onInformation() {
    this.showTutorial = true;
    this.showFab = false;
  }

  onAdd() {
    this.navCtrl.push(BreatheDetailPage);
  }

  onProfileClick() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Walkthrough',
          handler: () => {
            let modal = this.modalCtrl.create(WalkthroughPage);
            modal.present();
          }
        },
        {
          text: 'Log Out',
          role: 'destructive',
          handler: () => {
            this.afAuth.auth.signOut().then(() =>{
              this.navCtrl.setRoot(LoginPage);
              // this.navCtrl.pop();              
          }, error => {
            let alert = this.alertCtrl.create({
              title: 'Sorry',
              subTitle: error.message,
              buttons: ['Okay']
            });
            alert.present();
          });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
 
    actionSheet.present();
  }
  

}
