// Moduls Application Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

//Moduls others
import { ImageCropperModule } from 'ngx-image-cropper';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// Moduls Framework MDBoostrap for styles in the HTML
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Moduls Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Components APP
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ConversationComponent } from './Components/conversation/conversation.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { Page404Component } from './Components/page404/page404.component';
import { NavComponent } from './Components/nav/nav.component';
import { RequestComponent } from './Components/modals/request/request.component';

// Services, Interfaces, Pipes and others
import { SearchPipe } from './Pipes/search';
import { TruncatePipe } from './Pipes/truncate';
import { environment } from '../environments/environment';
import { ContactComponent } from './Components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    Page404Component,
    NavComponent,
    SearchPipe,
    TruncatePipe,
    RequestComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseDemo),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [],
  entryComponents: [RequestComponent]
})
export class AppModule { }
