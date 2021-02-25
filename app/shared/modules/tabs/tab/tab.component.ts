import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren, HostBinding,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import {TabsService} from '../tabs.service';
import {Subject} from 'rxjs';
import {delay, startWith, takeUntil} from 'rxjs/operators';
import {TabTitleComponent} from '../tab-title/tab-title.component';
import { TabContentDirective } from '../directives/tab-content.directive';

@Component({
  selector: 'tab',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, OnDestroy, AfterViewInit {
  private index = 0;
  private destroy$ = new Subject();

  // @ts-ignore
  @ContentChild(TabContentDirective) private tabContent: TabContentDirective | undefined;
  @ContentChildren(TabTitleComponent)  private titles: QueryList<TabTitleComponent> | undefined;
  @HostBinding('class.active') private active: boolean;

  constructor(private tabsService: TabsService) { }

  ngOnInit(): void {
    this.index = this.tabsService.getIndex();
  }

  ngAfterViewInit(): void {
    this.titles?.changes.pipe(
      startWith(this.titles),
      takeUntil(this.destroy$)
    ).subscribe(() => this.tabsService.setTitles(this.index, this.titles?.first.elRef.nativeElement.innerText));

    this.tabsService.getActiveIndex().pipe(
      delay(0),
      takeUntil(this.destroy$)
    ).subscribe(activeIndex => {
      this.active = this.index === activeIndex;

      this.active ? this.tabContent?.render() : this.tabContent?.destroy();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
