import { ProductService } from './../../../services/product.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss']
})
export class PhotoPickerComponent implements OnInit {

  @Output() uploadedPhoto = new EventEmitter();
  @Input() imagePreviewUrl!: string;
  uploadProgress!: number;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onSaveFile(photo: any) {
    if (photo.files.length > 0) {
      const [file] = photo.files;
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imagePreviewUrl = event.target.result);
      reader.readAsDataURL(file);

      this.productService.uploadPicture(file)
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? 1;
            this.uploadProgress = Math.round(100 * (event.loaded / total));
          }
        },
        (error) => console.log(error)
      );
    }
  }
}
