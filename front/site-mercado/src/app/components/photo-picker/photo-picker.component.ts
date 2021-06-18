import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss']
})
export class PhotoPickerComponent implements OnInit {

  @Output() uploadedPhoto = new EventEmitter();

  file!: File;
  imagePreviewUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSaveFile(photo: any) {
    if (photo.files.length > 0) {
      const [file] = photo.files;
      this.file = file;
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imagePreviewUrl = event.target.result);
      reader.readAsDataURL(file);
    }
  }
}
