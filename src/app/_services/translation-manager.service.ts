import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/** supported language translations */
const availableLangs = [ "de", "en", "it", "ru" ];

/** This is a service class that is used to manage translations in the application.
 *  It provides methods to translate keys and get the current language.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationManagerService{
  /**
   * private property "_lang"  stores the current language. If it's not set,
   * it will try to get the browser language or use the default language from the TranslateService.
   */
	private _lang: string | undefined = undefined;
  /**
   * it initializes the translateService object, which is an instance of TranslateService class
   * @param translateService
   */
	constructor(
		private translateService: TranslateService
	) {}
    /**
     * The getTranslation method takes in a translations object and a key. The method
     * then uses the key to traverse the translations object and returns the translated string
     * for the key.
     * @param translations Object that contains all translations
     * @param key for specific translacion fro example en, de
     */
	getTranslation(translations: Object, key: string): string{
		let aKey = key.split(".");

		let usedKey = aKey[0];
		if(aKey.length == 1){
			return this.getObjectProperty(translations, usedKey);
		}
		aKey.shift();
		let newKey = aKey.join();
		if(!newKey) throw new Error("Array for new key is empty");
		return this.getTranslation(this.getObjectProperty(translations, usedKey), newKey);
	}
  /**
   * The getObjectProperty() method is a helper method used to search for a specific property
   * in a JavaScript object. It takes two arguments, an object and a search key. It iterates
   * through the object using the Object.entries() method which returns an array of key-value
   * pairs. It then checks if the current key matches the search key, if it does it returns the
   * value of that property, if not it continues iterating until it finds the key or until it
   * has checked all the properties. If it doesn't find the key it returns the search key.
   * @param object
   * @param searchKey
   * @returns value if the key matches, if not it returns the searchkey
   */
	private getObjectProperty(object: Object, searchKey: string): any{
		for (const [key, value] of Object.entries(object)) {
			if(key === searchKey){
				return value;
			}
		}
		return searchKey;
	}
  /**
   * The lang property getter, returns the current language or the browser language or
   * the default language
   * @returns the current language or the browser language or the default language
   */
	get lang(): string{
		if(this._lang == null){
			let browserLang = this.translateService.getBrowserLang();
			if(browserLang){
				if(this.translateService.getLangs().includes(browserLang)) return browserLang;
			}
			return this.translateService.getDefaultLang();
		}
		return this._lang;
	}
  /**
   * The setter method lang sets the current language to use in the application. It sets the
   * private variable _lang to the passed in language, sets the language to be used in the
   * TranslateService and also stores the language in the local storage of the browser so it can
   * be retrieved later.
   */
	set lang(lang: string){
		this._lang = lang;
		this.translateService.use(lang);
		localStorage.setItem("lang", lang);
	}
  /**
   * The load() method is used to load the current language on application startup. It will check
   * the local storage for a previously set language, if not found it will check the browser
   * language, if not found it will use the default language.
   */
	load(){
		this.translateService.addLangs(availableLangs);
		const lang = localStorage.getItem("lang");
		if(lang) {
			this.lang = lang;
			this.translateService.use(lang);
			return;
		}
		let browserLang = this.translateService.getBrowserLang();
		if(browserLang && this.translateService.getLangs().includes(browserLang)){
			this.translateService.use(browserLang);
			return;
		}
		this.translateService.use(this.translateService.getDefaultLang());
	}

}
