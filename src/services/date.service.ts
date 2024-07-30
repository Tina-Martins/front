import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public makeDisplayableDate(dateObject: string | Date): string {
    if (!dateObject) return '';

    let date: Date = new Date(dateObject);
    
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    const dayString = day < 10 ? `0${day}` : day.toString();
    const monthString = month < 10 ? `0${month}` : month.toString();

    return `${dayString}/${monthString}/${year}`;
  }

  public makeISODate(dateObject: string | Date): string {
    return new Date(dateObject).toISOString();
  }
}
