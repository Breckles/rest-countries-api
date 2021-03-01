import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output()
  onSearch = new EventEmitter<string>();
  searchText = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.searchText.valid) {
      this.onSearch.next(this.searchText.value);
    }
  }

  reset() {
    this.searchText.reset();
  }
}
