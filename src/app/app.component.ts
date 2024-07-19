import { Component, ViewChild } from '@angular/core';
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";
import { ImageDrawingModule } from 'ngx-image-drawing';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'screenshot-app';
  img = "";
  show = false;

  @ViewChild("screen", { static: true }) screen: any;

  constructor(private captureService: NgxCaptureService) {}

  captureScreenshot() {
    this.captureService
      .getImage(document.body, true)
      .pipe(
        tap(img => {
          this.img = img;
          this.show = true;
          // console.log(img);
        })
      )
      .subscribe();
  }

  save(img: any){
    this.img = img;
    this.show = false;
    // console.log(img);
    FileSaver.saveAs(img, 'result.png');
  }

  cancel(img: any){
    this.img = '';
    this.show = false;
  }
}
