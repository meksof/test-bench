import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LanguageService } from './_common/services/language.service';

// AoT requires an exported function for factories
export function createTranslateLoader(handler: HttpBackend) {
  const http = new HttpClient(handler);
  // https://deelay.me/5000/http://localhost:4200/assets/i18n/
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpBackend]
      }
    }),
  ],
  providers: [
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
