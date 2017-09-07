import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'sx-nav-list-page',
  templateUrl: './nav-list-page.component.html',
  styleUrls: ['./nav-list-page.component.scss']
})
export class NavListPageComponent implements AfterViewInit {

  @Input() header: string;
  @Input() color = 'primary';
  @Input() navmenu: Array<any> = [];
  @Input() sideNavWidth = '250px'
  @Input() modulo: string;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private titleService: Title) {}

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
    this.titleService.setTitle(this.header);
  }

  closeNav() {
    console.log('close navigation bar');
  }

}
