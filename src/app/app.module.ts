import { NgModule  } from '@angular/core';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,    
    CoreModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
