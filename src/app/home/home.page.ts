import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

readFile(event: any) {
    console.log(event);
    const file = event.target.files[0];
    const fileType = file.type.split('/')[0];
    console.log('File type:', fileType);
    console.log('File uploaded:', file);
    const fileDisplay = document.getElementById('file-display');
    if (fileDisplay) {
      fileDisplay.innerHTML = '';
    }
    const reader = new FileReader();
    if (fileType === 'image') {
      const imageUrl = URL.createObjectURL(file);
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = 'Uploaded Image';
      imgElement.style.minWidth = '100%';
      imgElement.style.minHeight = '400px';
      document.getElementById('file-display')?.appendChild(imgElement);
    } else if (fileType === 'video') {
      const videoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      videoElement.controls = true;
      videoElement.style.maxWidth = '100%';
      videoElement.style.maxHeight = '400px';
      document.getElementById('file-display')?.appendChild(videoElement);
    }
    event.target.value = '';
  }
}
