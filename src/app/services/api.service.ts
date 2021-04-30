import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiKey: string = environment.apiKey;
  apiUrl = 'https://api.exchangeratesapi.io/v1';
  base = 'EUR';
  symbols =
    'USD,JPY,GBP,HKD,CHF,CAD,SGD,AUD,BHD,KWD,SAR,BND,IDR,THB,AED,EUR,PHP,KRW,CNY,ARS,BRL';

  constructor(private http: HttpClient) {}

  getExchangeRates() {
    const url = `${this.apiUrl}/latest?access_key=${this.apiKey}&base=${this.base}&symbols=${this.symbols}`;
    const promise = new Promise((resolve, reject) =>
      this.http.get(url).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      )
    );
    return promise;
  }

  convertRate(from: string, to: string, amount: number) {
    /**
     * message: "Access Restricted - Your current Subscription Plan does not support this API Function."
     */
    const url = `${this.apiUrl}/convert?access_key=${this.apiKey}&from=${from}&to=${to}&amount=${amount}`;
    const promise = new Promise((resolve, reject) =>
      this.http.get(url).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      )
    );
    return promise;
  }
}
