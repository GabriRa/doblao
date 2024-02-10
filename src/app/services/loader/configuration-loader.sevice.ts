import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigLoaderService {
  private httpClient: HttpClient;
  private config: any;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  get Config() {
    return this.config;
  }

  public async loadConfigs(): Promise<any> {
    console.log('load');
    return this.httpClient
      .get('assets/config.json')
      .pipe((settings) => settings)
      .toPromise()
      .then((settings) => {
        this.config = settings;
        console.log(this.config);
      });
  }
}
