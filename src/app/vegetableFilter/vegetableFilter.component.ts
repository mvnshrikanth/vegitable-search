import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vegetable-filter',
  templateUrl: './vegetableFilter.component.html',
  styleUrls: ['./vegetableFilter.component.scss']
})

export class VegetableFilter implements OnInit {
  @Input() vegetables: string[];
  filteredItems: string[];

  ngOnInit() {
    this.createCopy();
  }

  createCopy() {
    this.filteredItems = Object.assign([], this.vegetables);
  };

  // filterVegetables(value) {
  //   if (!value) {
  //     this.createCopy();
  //   }
  //   this.filteredItems = Object.assign([], this.vegetables).filter(
  //     veg =>
  //       veg.toLowerCase().indexOf(value.toLowerCase()) > -1
  //   );
  // }

  filterVegetables(value) {
    console.log(value);
    // this.inputVeg = value;
    if (value === '') {
      this.createCopy();
    }

    this.filteredItems = Object.assign([], this.vegetables).filter(
      veg => veg.toLowerCase().substr(0, value.length) === value.toLowerCase()
    );
  }

  searchVeg(element, thisArg): boolean {
    return element.substr(0, thisArg.length) === thisArg
  }


}
