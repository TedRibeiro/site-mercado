import { ProductService } from './../../../services/product.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo-picker',
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss']
})
export class PhotoPickerComponent implements OnInit {

  @Output() uploadedPhoto = new EventEmitter();
  @Input() imagePreviewUrl!: string;
  @Input() submitted = false;
  uploadProgress!: number;

  isLoading = false;
  uploadError = false;
  invalidPhoto = false;

  file!: File;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(photo: any) {
    if (photo.files.length > 0) {
      const file: File = photo.files[0];
      this.invalidPhoto = !this._isPhotoValid(file);

      if (this.invalidPhoto) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: any) => (this.imagePreviewUrl = event.target.result);
      reader.readAsDataURL(file);
      this.file = file;

      this.uploadFile();
    }
  }

  uploadFile() {
    this.isLoading = true;
    this.uploadError = false;
    this.invalidPhoto = false;

    this.productService.uploadPicture(this.file)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total = event.total ?? 1;
          this.uploadProgress = Math.round(100 * (event.loaded / total));
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      },
      error => {
        if(!!error.error?.InvalidType) {
          this.invalidPhoto = true;
          this.imagePreviewUrl = '';
          return;
        } else if (!!error.error?.Required) {
          this.imagePreviewUrl = '';
        }

        this.uploadError = true;
      }
    );
  }

  private _isPhotoValid(file: File): boolean {
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (!validExtensions.find(e => e === fileExtension)) {
      return false;
    }

    return true;
  }

  get errorMsg(): string {
    if (this.invalidPhoto) { return 'Formato inválido'}

    if (!this.imagePreviewUrl && this.submitted) { return 'Adicione uma foto'; }

    return '';
  }
}
