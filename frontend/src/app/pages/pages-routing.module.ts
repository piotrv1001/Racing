import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { RaceListComponent } from "./race-list/race-list.component";
import { DriverDragDropComponent } from "../components/driver-drag-drop/driver-drag-drop.component";
import { SeasonListComponent } from "./season-list/season-list.component";

@NgModule({
  imports: [
  RouterModule.forChild([
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'seasons',
      component: SeasonListComponent
    },
    {
      path: 'races',
      component: RaceListComponent
    },
    {
      path: 'drivers',
      component: DriverDragDropComponent
    }
  ])
]})
export class PagesRoutingModule { }