import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface ICurrencyItem {
  cc:string,
  rate:number
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  select1:string="UAH"
  select2:string="UAH"
  usd:number=0
  eur:number=0
  secondValue:number=0
  firstValue:number=0
  thirdValue:number=0

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
  changeFirst() {
    switch (this.select1) {
      case "UAH":
        this.thirdValue = this.firstValue
        break
      case "USD":
        this.thirdValue = (this.firstValue * this.usd)
        break
      case "EUR":
        this.thirdValue = (this.firstValue * this.eur)
        break
    }
    switch (this.select2) {
      case "UAH":
        this.secondValue = this.thirdValue
        break
      case "USD":
        this.secondValue = Number((this.thirdValue / this.usd).toFixed(2))
        break
      case "EUR":
        this.secondValue = Number((this.thirdValue / this.eur).toFixed(2))
        break
    }
  }
  changeSecond(){
    switch (this.select2){
      case 'UAH':
      this.thirdValue=this.secondValue
        break
      case "USD":
      this.thirdValue=(this.secondValue*this.usd)
        break
      case "EUR":
      this.thirdValue=(this.secondValue*this.eur)
        break
    }
    switch (this.select1){
      case "UAH":
      this.firstValue=this.thirdValue
        break
      case "USD":
      this.firstValue=Number((this.thirdValue/this.usd).toFixed(2))
        break
      case "EUR":
      this.firstValue=Number((this.thirdValue/this.eur).toFixed(2))
        break
    }
  }
  setSelect1(event:any){
    this.select1=event.target.value
    this.changeSecond()
  }
  setSelect2(event:any){
    this.select2=event.target.value
    this.changeFirst()
  }
}
