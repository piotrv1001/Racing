import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Prediction } from '../model/entities/prediction.model';
import { PredictionDTO } from '../model/dto/prediction.dto';
import { BASE_URL } from '../app.constants';
import { Score } from '../model/entities/score.model';
import { BonusStat } from '../model/entities/bonus-stat.model';

export type PredictionOutput =
  | Prediction[]
  | { predictions: Prediction[]; scores: Score[]; bonusStats?: BonusStat[]; };

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  PREDICTION_ROUTE = 'predictions';

  constructor(private http: HttpClient) {}

  createMany(predictionDtoArray: PredictionDTO[]): Observable<PredictionOutput> {
    return this.http.post<PredictionOutput>(`${BASE_URL}/${this.PREDICTION_ROUTE}/createMany`, predictionDtoArray);
  }

  updateMany(predictionArray: Prediction[]): Observable<PredictionOutput> {
    return this.http.put<PredictionOutput>(`${BASE_URL}/${this.PREDICTION_ROUTE}/updateMany`, predictionArray);
  }

  getByUserAndRaceAndGroup(userId: number, raceId: number, groupId: number): Observable<Prediction[]> {
    return this.http.get<Prediction[]>(`${BASE_URL}/${this.PREDICTION_ROUTE}?userId=${userId}&raceId=${raceId}&groupId=${groupId}`);
  }

  getGroupedPredictions(groupId: number, raceId: number): Observable<Record<string, Prediction[]>> {
    const url = `${BASE_URL}/${this.PREDICTION_ROUTE}/${groupId}/races/${raceId}/predictions`;
    return this.http.get<Record<string, Prediction[]>>(url);
  }

}
