import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/navigation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';

interface Language{
  name: string,
  code: string
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  public selectedLanguage: Language | undefined = undefined;
  private _languages: Language[] = [];

  constructor(
    private _ns: NavigationService,
    private _router: Router,
    private _translateService: TranslateService,
    private _translationManagerService: TranslationManagerService
  ) {}

  ngOnInit(): void {
    this._translateService.get("settings").subscribe(translation => {
      this._ns.changeMessage(translation);
    });

    this._translateService.getTranslation(this._translationManagerService.lang).subscribe(translations => {
      this._languages = [];
      this._translateService.getLangs().forEach(lang => {
        const language = { name: this._translationManagerService.getTranslation(translations, "languages." + lang), code: lang };
        this._languages.push( language );
        if(this._translationManagerService.lang == lang) this.selectedLanguage = language;
      });
      if(this.selectedLanguage == null && this.languages.length > 0)
        this.selectedLanguage = this.languages[0];
    });

  }

  save(){
    if(this.selectedLanguage == null) return;
    this._translationManagerService.lang = this.selectedLanguage.code;
    this._router.navigate(["emission"]);
  }

  get languages(): Language[] {
    return this._languages;
  }

}
