import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{

	@Output("file") public fileEmitter = new EventEmitter<File>();

	private _filename: string = "";

	handleFileSelected(event: any){
		const files = event.target.files;
		if(files.length == 0) return;
		const file = files[0];
		
		this._filename = file.name;

		this.fileEmitter.emit(file);
	}

	get filename(): string{
		return this._filename;
	}
}
