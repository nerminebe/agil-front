// bon-travail.ts

import { Reclamation } from "./Reclamation";
import { StatusBonTravail } from "./StatusBonTravail";
import { UserDto } from "./UserDto";

export interface BonTravail {
    id: number;                      // Correspond à Long en Java
    technicien: UserDto;                // Relation ManyToOne avec User
    reclamation: Reclamation;        // Relation ManyToOne avec Reclamation
    dateIntervention: Date;          // Correspond à Date en Java
    detailsIntervention: string;     // Correspond à String en Java
    status: StatusBonTravail;        // Enum, équivalent à StatusBonTravail en Java
    enCoursLe: Date;                 // Date en Java
    termineLe: Date;                 // Date en Java
    clotureLe: Date;                 // Date en Java
}
