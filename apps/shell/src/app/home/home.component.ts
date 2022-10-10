import { GalleryFacade } from '@mf-app/shared/data-store';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mf-app-gallery-entry',
  template: `
  <main>
    <h1>
      Seja bem vindo ao site dos gatos
    </h1>

    <p>
    Gatos amam mais as pessoas do que elas permitiriam. Mas eles têm sabedoria suficiente para manter isso em segredo (Mary Wilkins);
    </p>
  </main>
  <div class="container">
    <ng-container *ngFor="let cat of cats | async">
      <div class="child">
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
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
      }

      img {
        width: 20vw;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  cats = this.galleryFacade.selectedCats$.pipe(
    map((selectedCats: any) => Array.from(selectedCats.values()))
  ) as any;
  constructor(private galleryFacade: GalleryFacade) { }

  ngOnInit(): void {
    this.galleryFacade.init();
  }
}
