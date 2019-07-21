import { Component, OnInit, NgZone } from '@angular/core';
import { Accountnode } from 'src/app/helios/model/accountnode';
import { ListService } from '../../service/list.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  errorMessage: string;
  accountNodes: Accountnode[] = [];

  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  constructor(zone: NgZone, private listService: ListService) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngOnInit() {
    this.listService.getAccountNodes().subscribe(
      data => {
        this.accountNodes = data;
      },
      error => (this.errorMessage = error as any)
    );
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
