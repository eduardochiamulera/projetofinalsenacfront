import { NgModule, LOCALE_ID } from '@angular/core';
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

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
  providers: [{provide: LOCALE_ID,      useValue: 'pt-BR'    } ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
