import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }

 ngOnInit(): void {
   
    const zoom = document.querySelector('.zoom') as HTMLElement;
    
    
    zoom.addEventListener('click', function(e: MouseEvent) {
      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.classList.add('zoom-overlay');
      zoom.appendChild(overlay);
      setTimeout(function() {
        overlay.classList.add('active');
      }, 50);
    });


    

  
  }
}
