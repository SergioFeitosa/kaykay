import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})

export class StarComponent implements OnChanges{

  @Input()

  rating: number = 0;

  starWidth: number = 0;

  ngOnChanges(): void {
    this.starWidth = this.rating * 76 / 5;
  }
}
