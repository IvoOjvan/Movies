import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

interface Cast {
  id?: number;
  character: string;
  name: string;
}

@Component({
  selector: 'cast-table-pagination',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule],
  templateUrl: './cast-table.html',
})
export class CastTablePagination implements OnChanges {
  @Input() data: Cast[] = [];

  page = 1;
  pageSize = 8;
  collectionSize = 0;
  cast: Cast[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.collectionSize = this.data.length;
      this.refreshData();
    }
  }

  refreshData() {
    this.cast = this.data
      .map((cast, i) => ({ id: i + 1, ...cast }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
