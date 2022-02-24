import { Component } from '@angular/core';
import { Calculation } from 'src/app/emissionmodule/calculation';
import { EmissionModule } from 'src/app/emissionmodule/emission-module';

export interface ImportData{
	modules: EmissionModule[]
}

@Component({
  selector: 'app-import-file-dialog',
  templateUrl: './import-file-dialog.component.html',
  styleUrls: ['./import-file-dialog.component.scss']
})
export class ImportFileDialogComponent {

  private _importData: ImportData | undefined = undefined;

  handleFileUpload(file: File){
	let reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onloadend = () => {
		if(reader.result == null) return;
		if(typeof reader.result == "string") this.loadStringToData(reader.result);
	}
  }

  loadStringToData(dataString: string){
	const data = Calculation.load(JSON.parse(dataString)) as any;

	// We don't want these properties
	delete data._id;
	delete data.name;

	this._importData = { modules: data.modules };
  }

  get importData(): ImportData | undefined{
  	return this._importData;
  }

  get loadedModules(): EmissionModule[]{
	if(this._importData == null) return [];
	return this._importData.modules;
  }
}
