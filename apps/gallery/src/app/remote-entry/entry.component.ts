import { Component } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';

@Component({
  selector: 'mf-app-gallery-entry',
  template: ` <div class="container">
    <ng-container *ngFor="let cat of cats | async">
      <div
        class="child"
        (click)="toggleSelectCat(cat)"
        [ngClass]="{ selected: isSelected(cat.id) | async }"
      >
        <h3>
          {{ cat.title }}
        </h3>
        <div>
          <img [src]="cat.url" alt="" />
        </div>
      </div>
    </ng-container>
  </div>`,
  styles: [
    `
      .container {
        display: grid;
        width: calc(100% - 6vw);
        grid-template-columns: repeat(4, 1fr);
        background-color: #ece8f9;
        padding-top: 1.5vw;
        padding-bottom: 1.5vw;
        padding-right: 3vw;
        padding-left: 3vw;
        border-radius: 20px;
      }

      .selected {
        border: 3px solid purple;
      }

      img {
        width: 20vw;
        height: 20vw;
        border-radius: 20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        object-fit: cover;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  cats = this.galleryFacade.allGallery$ as any;
  selectedCats = this.galleryFacade.selectedCats$;

  constructor(private galleryFacade: GalleryFacade) { }

  toggleSelectCat(cat: any) {
    this.galleryFacade.toggleSelectCat(cat);
  }

  isSelected(catId: any) {
    return this.galleryFacade.isCatSelected(catId);
  }
}
