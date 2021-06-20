import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss']
})
export class PhotoPickerComponent implements OnInit {

  @Output() uploadedPhoto = new EventEmitter();
  @Input() imagePreviewUrl!: string;

  file!: File;

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
      this.uploadedPhoto.emit(this.imagePreviewUrl);
    }
  }
}
