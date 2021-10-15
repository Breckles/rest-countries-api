import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { CountryCardComponent } from 'src/app/components/countries/country-card/country-card.component';
import { Country } from 'src/app/components/countries/models/country.model';

@Directive({
  selector: '[appCountryCardPopup]',
})
export class CountryCardPopupDirective implements OnInit, OnDestroy {
  @Input()
  viewContainerRef!: ViewContainerRef;
  @Input()
  country!: Country;
  private componentRef: ComponentRef<CountryCardComponent> | null = null;
  // private popupVisible = false;

  constructor(
    private hostElRef: ElementRef,
    private cfr: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.viewContainerRef) {
      throw new Error("An argument for 'viewContainerRef' must be provided.");
    }
    if (!this.country) {
      throw new Error("An argument for 'country' must be provided.");
    }
  }

  @HostListener('mouseenter', ['$event'])
  createPopup(event: MouseEvent) {
    event.stopPropagation();
    if (!this.componentRef) {
      const factory = this.cfr.resolveComponentFactory(CountryCardComponent);
      this.componentRef = this.viewContainerRef.createComponent(factory);
      this.componentRef.instance.country = this.country;
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'position',
        'fixed'
      );
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'width',
        '200px'
      );
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'height',
        'fit-content'
      );
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'box-shadow',
        '0 -4px 4px rgba(0, 0, 0, 0.1), 4px 0 4px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1), -4px 0 4px rgba(0, 0, 0, 0.1)'
      );
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'left',
        `${event.x + 3}px`
      );
      this.renderer.setStyle(
        this.componentRef.location.nativeElement,
        'bottom',
        `${window.innerHeight - this.hostElRef.nativeElement.offsetTop + 5}px`
      );
    }
  }

  @HostListener('mouseleave', ['$event'])
  destroyPopup(event: MouseEvent) {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
