import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const availableLangs = [ "de", "en" ];

@Injectable({
  providedIn: 'root'
})
export class TranslationManagerService{

	private _lang: string | undefined = undefined;

	constructor(
		private translateService: TranslateService
	) {}

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

	private getObjectProperty(object: Object, searchKey: string): any{
		for (const [key, value] of Object.entries(object)) {
			if(key === searchKey){
				return value;
			}
		}
		return searchKey;
	}

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

	set lang(lang: string){
		this._lang = lang;
		this.translateService.use(lang);
		localStorage.setItem("lang", lang);
	}

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
