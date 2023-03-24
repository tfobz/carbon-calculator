import { Component } from '@angular/core';
import { Calculation } from 'src/app/emissionmodule/calculation';
import { EmissionModule } from 'src/app/emissionmodule/emission-module';
/**
 * This is an interface that defines the structure of the data that will be imported.
 * It specifies that there is an array of EmissionModule called modules.
 */
export interface ImportData{
  /** array of EmissionModule  */
	modules: EmissionModule[]
}
/**
 * This is a component class for an import file dialog in an Angular application
 */
@Component({
  selector: 'app-import-file-dialog',
  templateUrl: './import-file-dialog.component.html',
  styleUrls: ['./import-file-dialog.component.scss']
})
export class ImportFileDialogComponent {

  /**
   * This is a private property of the component that holds the data that is imported from
   * the file. It is initialized as undefined.
   */
  private _importData: ImportData | undefined = undefined;
  /**
   * This method reads the contents of the passed file using the FileReader API and converts it
   * to a binary string. Once the file is read and loaded, it calls the
   * loadStringToData(dataString: string) method and passes the binary string as an argument.
   * @param file
   */
  handleFileUpload(file: File){
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      if(reader.result == null) return;
      if(typeof reader.result == "string") this.loadStringToData(reader.result);
    }
  }
  /**
   * This method takes in a binary string as an argument and converts it to a JSON object using
   * the JSON.parse() method. It then assigns the modules property of the JSON object to a new
   * property _importData of the component.
   * @param dataString
   */
  loadStringToData(dataString: string){
    const data = Calculation.load(JSON.parse(dataString)) as any;

    // We don't want these properties
    delete data._id;
    delete data.name;

    this._importData = { modules: data.modules };
  }
  /**
   * This getter method returns the _importData property.
   */
  get importData(): ImportData | undefined{
  	return this._importData;
  }
  /**
   *  This getter method returns the modules property of the _importData object.
   *  If _importData is null, an empty array is returned.
   */
  get loadedModules(): EmissionModule[]{
	if(this._importData == null) return [];
	return this._importData.modules;
  }
}
