import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfigLoaderService } from './services/loader/configuration-loader.sevice';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appinitializaterFactory,
      deps: [ConfigLoaderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function appinitializaterFactory(
  configLoaderService: ConfigLoaderService
) {
  return () => configLoaderService.loadConfigs();
}
