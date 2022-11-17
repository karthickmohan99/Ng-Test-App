import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  apiData: any[] = []
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  allApiData: any[] = [];
  fallBackUi: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.get()
  }

  get() {
    this.apiService.getData().subscribe((res) => {
      console.log(res.entries, "api data")
      this.apiData = res.entries;
      this.allApiData = res.entries

    }, (err) => { console.log(err, "errr") })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.get();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get();
  }

  applyFilter(filterValue: any) {
    console.log(filterValue.target.value, "filter")
    let filterValueLower = filterValue.target.value.toLowerCase();
    if (filterValue === '') {

      this.apiData = this.allApiData;
    }
    else {
      this.apiData = this.allApiData.filter((dat) => dat.API.toLowerCase().includes(filterValueLower) || dat.Description.toLowerCase().includes(filterValueLower) || dat.Category.toLowerCase().includes(filterValueLower) || dat.Cors.toLowerCase().includes(filterValueLower));

      const filterResult = this.apiData
      console.log(filterResult, "filterResult")
      !filterResult.length ? this.fallBackUi = true : this.fallBackUi = false
    }
  }


}
