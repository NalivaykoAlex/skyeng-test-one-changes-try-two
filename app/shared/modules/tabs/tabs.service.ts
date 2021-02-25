import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class TabsService {
  private index = 0;
  private activeIndex$ = new BehaviorSubject<number>(0);
  private titles$ = new BehaviorSubject<string[]>([]);

  constructor() { }

  getIndex(): number {
    return this.index ++;
  }

  setActiveIndex(index: number): void {
    this.activeIndex$.next(index);
  }

  getActiveIndex(): Observable<number> {
    return this.activeIndex$.asObservable();
  }

  setTitles(index: number, title: string): void {
    const titles = this.titles$.value;

    titles[index] = title;

    this.titles$.next(titles);
  }

  removeTitle(): void {
    const titles = this.titles$.value;

    titles.pop();

    this.index = this.index - 1;
  }

  getTitles(): Observable<string[]> {
    return this.titles$.asObservable();
  }
}
