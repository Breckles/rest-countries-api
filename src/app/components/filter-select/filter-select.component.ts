import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss'],
})
export class FilterSelectComponent implements OnInit {
  @Input()
  filterField!: string;
  @Input()
  filterFieldOptions!: string[];
  @Output()
  filterFieldOptionSelected = new EventEmitter<string>();

  activeOption = 'all';
  listOpen = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.filterField) {
      throw new Error("A value for 'filterField' must be provided.");
    }

    if (!this.filterFieldOptions) {
      throw new Error("A value for 'filterFieldOptions' must be provided.");
    }

    document.addEventListener('click', (event: MouseEvent) => {
      this.listOpen = false;
    });
  }

  clickToggleOptionsList(event: Event) {
    event.stopPropagation();
    this.listOpen = !this.listOpen;
  }

  keypressToggleOptionsList(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.clickToggleOptionsList(event);
    }
  }

  onClickSelectFilterFieldOption(filterFieldOption: string) {
    if (filterFieldOption !== this.activeOption) {
      this.activeOption = filterFieldOption;
      this.filterFieldOptionSelected.emit(this.activeOption);
    }
  }

  onKeydownSelectFilterFieldOption(
    event: KeyboardEvent,
    filterFieldOption: string
  ) {
    if (event.key === 'Enter') {
      this.onClickSelectFilterFieldOption(filterFieldOption);
    }
  }

  reset() {
    this.activeOption = 'all';
    this.listOpen = false;
  }
}
