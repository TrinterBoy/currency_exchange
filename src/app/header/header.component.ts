import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface ICurrencyItem {
  cc:string,
  rate:number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  usd:number=0
  eur:number=0

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.http.get<ICurrencyItem[]>("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .subscribe((response)=>{
        response.map(currency=>{
          if(currency.cc=="USD")
            this.usd=Number(currency.rate.toFixed(2))
          if(currency.cc=="EUR")
            this.eur=Number(currency.rate.toFixed(2))
        })
      })

  }
}


