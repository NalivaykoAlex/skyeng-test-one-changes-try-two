import {AfterViewInit, Component, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {TabsService} from '../tabs.service';
import {Observable, Subject} from 'rxjs';
import {TabComponent} from '../tab/tab.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  providers: [TabsService]
})
export class TabsComponent implements OnInit, AfterViewInit, OnDestroy {
  public titles$: Observable<string[]> | undefined;
  private destroy$ = new Subject();
  public activeIndex = 0;
  private countTabs = 0;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> | undefined;

  constructor(private tabsService: TabsService) { }

  ngOnInit(): void {
    this.titles$ = this.tabsService.getTitles();
  }

  ngAfterViewInit(): void {
    this.countTabs = this.tabs?.length || 0;

    this.tabs?.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((tabs: QueryList<TabComponent>) => {
        const activeTab = tabs.toArray().find((_: TabComponent, index: number) => index === this.activeIndex);

        if (!activeTab) {
          this.tabsService.setActiveIndex(0);
        }

        if (this.countTabs >= tabs.length) {
          this.tabsService.removeTitle();
        }

        this.countTabs = tabs.length;
      });

    this.tabsService.getActiveIndex()
      .pipe(takeUntil(this.destroy$))
      .subscribe(activeIndex => {
        this.activeIndex = activeIndex;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickTab(index: number): void {
    this.tabsService.setActiveIndex(index);
  }
}
