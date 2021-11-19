import { NgModule  } from '@angular/core';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,    
    CoreModule, 
    BrowserAnimationsModule, 
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
