import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.page';
import { CountryPageComponent } from './pages/country/country.page';

import { CountryCardComponent } from './components/countries/country-card/country-card.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CountriesComponent } from './components/countries/countries.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { CountryDetailsComponent } from './components/countries/country-detail/country-details.component';
import { NameListPipe } from './shared/pipes/name-list/name-list.pipe';
import { CountryFlagComponent } from './components/countries/country-flag/country-flag.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CountryPageComponent,
    CountryCardComponent,
    HeaderComponent,
    SearchBarComponent,
    CountriesComponent,
    FilterSelectComponent,
    CountryDetailsComponent,
    NameListPipe,
    CountryFlagComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
