import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'sx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private iconRegistry: MdIconRegistry,
              private domSanitizer: DomSanitizer,
              ) {
    this.iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'luxor',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/luxorLogo32.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipapx2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipapx2.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipap-rx',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipap-rx.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'siipap-rx2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/siipap-rx2.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'paper',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/paper.svg'));
    this.iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg'));

  }


}
