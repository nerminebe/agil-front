import { Component, OnInit } from '@angular/core';
import { BonTravailService } from '../../../services/bon-travail.service';
import { BonTravail } from '../../../entities/BonTravail';
import { UserDto } from '../../../entities/UserDto';
import { Reclamation } from '../../../entities/Reclamation';
import { StatusBonTravail } from '../../../entities/StatusBonTravail';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bon-travail-list',
  templateUrl: './bon-travail-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class BonTravailListComponent implements OnInit {
  techniciens: UserDto[] = [];
  reclamations: Reclamation[] = [];
  statusOptions = Object.values(StatusBonTravail);  // Correctly populated enum values

  selectedTechnicien: number;
  selectedReclamation: number;
  dateIntervention: Date;
  detailsIntervention: string;
  status: StatusBonTravail;
  enCoursLe: Date;
  termineLe: Date;
  clotureLe: Date;

  constructor(private bonTravailService: BonTravailService) {}

  ngOnInit(): void {
    this.loadTechniciens();
    this.loadReclamations();
    console.log('Status options:', this.statusOptions);
  }
  

  loadTechniciens(): void {
    this.bonTravailService.getTechniciens().subscribe((techniciens: UserDto[]) => {
      console.log('Techniciens loaded:', techniciens); // Debugging line
      this.techniciens = techniciens;
    });
  }
  
  loadReclamations(): void {
    this.bonTravailService.getReclamations().subscribe((reclamations: Reclamation[]) => {
      console.log('Reclamations loaded:', reclamations); // Debugging line
      this.reclamations = reclamations;
    });
  }

  submitForm(): void {
    const bonTravail: BonTravail = {
      id: 0,
      technicien: this.techniciens.find(t => t.id === this.selectedTechnicien) || {} as UserDto,
      reclamation: this.reclamations.find(r => r.id === this.selectedReclamation) || {} as Reclamation,
      dateIntervention: this.dateIntervention,
      detailsIntervention: this.detailsIntervention,
      status: this.status,
      enCoursLe: this.enCoursLe,
      termineLe: this.termineLe,
      clotureLe: this.clotureLe,
    };

    this.bonTravailService.createBonTravail(bonTravail).subscribe((response) => {
      console.log('Bon de travail créé:', response);
    });
  }
}
