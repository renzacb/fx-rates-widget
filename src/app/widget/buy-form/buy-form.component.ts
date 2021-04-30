import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss'],
})
export class BuyFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private utilitiesService: UtilitiesService
  ) {}

  async ngOnInit() {
    this.utilitiesService.openSpinner();
    await this.getExchangeRates();
    await this.setCurrencies();
    this.setFormControls();
    this.setTime();
    this.showUi();
  }

  data: any = {};
  async getExchangeRates() {
    try {
      const response: any = await this.apiService.getExchangeRates();
      if (!response?.success) {
        throw Error('cannot get rates');
      }
      this.data = response;
    } catch (error) {
      this.utilitiesService.openDialog({
        title: 'Error',
        message: 'Cannot get rates, try again.',
      });
      return error;
    }
  }

  setTime() {
    let unixTimestamp = this.data?.timestamp;
    unixTimestamp = unixTimestamp ? unixTimestamp * 1000 : null;
    this.data.timestampDate = new Date(unixTimestamp);
  }

  currencies: any[] = [];
  async setCurrencies() {
    const rates = this.data?.rates || [];
    this.currencies = Object.keys(rates).map((currency) => ({
      currency: currency,
      rate: rates[currency],
    }));
  }

  forexForm: FormGroup = this.fb.group({});
  setFormControls() {
    const base = this.data?.base || '';
    const defaultCurrency = this.currencies.length
      ? this.currencies.find((currency) => currency.currency === base)
      : '';
    const controls = {
      fromCurrency: this.fb.control({ value: defaultCurrency, disabled: true }),
      fromAmount: this.fb.control(1, Validators.required),
      toCurrency: this.fb.control('', Validators.required),
      toAmount: this.fb.control(''),
    };
    this.forexForm = this.fb.group(controls);
  }

  uiIsShowing = false;
  showUi() {
    this.uiIsShowing = true;
    this.utilitiesService.closeSpinner();
  }

  convertRate() {
    const value = this.forexForm.value;
    if (!value.fromAmount || !value.toCurrency) {
      return;
    }
    const { fromAmount, toCurrency } = value;
    const result = toCurrency.rate * fromAmount;
    const controls = this.forexForm.controls;
    controls['toAmount'].setValue(result.toFixed(2));
  }

  convertRateBack() {
    const value = this.forexForm.value;
    if (!value.toAmount || !value.toCurrency) {
      return;
    }
    const { toAmount, toCurrency } = value;
    const result = toAmount / toCurrency.rate;
    const controls = this.forexForm.controls;
    controls['fromAmount'].setValue(result.toFixed(2));
  }

  currencyToBeBought = '';
  async transact() {
    if (this.forexForm.status !== 'VALID') {
      this.utilitiesService.openDialog({
        title: 'Error',
        message: 'Please complete the fields.',
      });
      return;
    }

    // ? Simulate buying transaction loading process
    this.utilitiesService.openSpinner();
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000));
    this.utilitiesService.closeSpinner();

    const { fromAmount, toAmount, toCurrency } = this.forexForm.value;
    let gain = `${toCurrency.currency} ${toAmount}`;
    let lost = `${fromAmount} EUR`;
    if (this.currencyToBeBought === 'fromCurrency') {
      gain = `${fromAmount} EUR`;
      lost = `${toCurrency.currency} ${toAmount}`;
    }
    this.utilitiesService.openDialog({
      title: `BOUGHT ${gain}`,
      message: `You gained: ${gain} and lost ${lost}.`,
    });
  }
}
