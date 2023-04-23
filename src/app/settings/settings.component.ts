import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../shared/navigation.service';
import { TranslationManagerService } from '../_services/translation-manager.service';
/**
 * This interface is used to represent a language.
 */
interface Language{
  /** The name of the language. */
  name: string,
  /** The code of the language. */
  code: string
}
/**
 * This component is used in the Settings page of the application.
 * It is responsible for displaying the available languages, allowing the user
 * to select a language and saving the selected language.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  /** A variable of type Language that stores the currently selected language. It is initialized as undefined. */
  public selectedLanguage: Language | undefined = undefined;
  /** A private variable of type Language[] that stores the available languages. */
  private _languages: Language[] = [];
  /**
   * The constructor assigns these services to private variables with the same name,
   * @param _ns A service that manages the navigation of the application.
   * @param _router A service that manages the routing of the application.
   * @param _translateService A service that provides internationalization (i18n) support.
   * @param _translationManagerService A service that manages the translation of the application.
   */
  constructor(
    private _ns: NavigationService,
    private _router: Router,
    private _translateService: TranslateService,
    private _translationManagerService: TranslationManagerService
  ) {}
  /**
   * A method that is called when the component is initialized. It sets the translation for the title of the page,
   * retrieves the available languages, sets the default language and sets the selected language.
   */
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
  /**
   *  A method that saves the selected language and navigates to the emission page. It checks if a language is selected before saving.
   * @returns void
   */
  save(){
    if(this.selectedLanguage == null) return;
    this._translationManagerService.lang = this.selectedLanguage.code;
    this._router.navigate(["emission"]);
  }
  /**
   * A getter method that returns the available languages.
   */
  get languages(): Language[] {
    return this._languages;
  }

}
