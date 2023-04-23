import { Component, EventEmitter, Output } from '@angular/core';
/**
 * The FileUploadComponent class is responsible for providing a file upload functionality in the Angular application. Here's the documentation:
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{
  /**
   * Emits the selected file to the parent component.
   */
	@Output("file") public fileEmitter = new EventEmitter<File>();
 /**
   * The name of the selected file.
   */
	private _filename: string = "";
 /**
   * Handles the selection of a file by the user.
   * It retrieves the selected file and emits it to the parent component via fileEmitter.
   * @param event - The event object containing the selected file.
   */
	handleFileSelected(event: any){
		const files = event.target.files;
		if(files.length == 0) return;
		const file = files[0];

		this._filename = file.name;

		this.fileEmitter.emit(file);
	}
   /**
   * Returns the name of the selected file.
   */
	get filename(): string{
		return this._filename;
	}
}
