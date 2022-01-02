import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {HistoryEntry} from "../model/history-entry.interface";
import {Role} from "../../auth/model/role.enum";
import {CurrentlyRentedService} from "../currently-rented.service";
import {AuthService} from "../../auth/auth.service";
import {RentalHistoryService} from "../rental-history.service";

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['brand', 'model', 'rentDate', 'returnDate', 'provider', 'showDetails'];
  dataSource: MatTableDataSource<HistoryEntry> = new MatTableDataSource<HistoryEntry>();
  public Client = Role.Client;
  loading$ = this.rentalHistory.loading$;

  constructor(private rentalHistory: RentalHistoryService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // if the user is an employee, return cars from all users, else just for the current user
    this.authService.user$.subscribe(user => this.getHistoryEntriesFromService(!!user && user.role === Role.Employee));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getHistoryEntriesFromService(all: boolean): void {
    this.rentalHistory.loadEntries(all).subscribe(entries => this.dataSource.data = entries);
  }

  formatDate(date: string): string {
    return new Date(Date.parse(date)).toLocaleString('pl');
  }
}
