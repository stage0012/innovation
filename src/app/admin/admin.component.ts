import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  status = false;
  chartOptions: any;
  EventArray: any[] = [];
  currentEventID = "";
  photoSelected: string | ArrayBuffer | null = null;
  file: File | null = null;
  title: string | null = null;
  description: string | null = null;
  imagePath = "";
  
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllEvent();
    this.chartOptions = {
      series: [
        {
          name: "South",
          data: this.generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        },
      ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: (chart: any, e: any) => {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      title: {
        text: "Customer Review"
      },
      colors: [ "#CED4DC"],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  onPhotoSelected(event: any): void {
    this.file = event.target.files[0] as File;
    // image preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string' || result instanceof ArrayBuffer) {
        this.photoSelected = result;
      }
    };
    reader.readAsDataURL(this.file);
  }
  
  uploadPhoto(): void {
    if (this.title && this.description && this.file) {
      this.photoService.createPhoto(this.title, this.description, this.file)
        .subscribe((data) => {
          this.photoSelected = null;
          this.title = null;
          this.description = null;
          this.imagePath = "";
          this.status = false;
          this.router.navigate(['admin']);
        });
    }
  }

 
  
    

 
 
  register() {
    
  
}

public generateDayWiseTimeSeries(baseval: number, count: number, yrange: { min: number; max: number }): [number, number][] {
    let i = 0;
    const series: [number, number][] = [];
    while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

  ngAfterViewInit() {
    
    const options = {
      startAngle: -1.55,
      size: 150,
      value: 0.85,
      fill: { gradient: ['#a445b2', '#fa4299'] }
    };
    
    $(".circle .bar").circleProgress(options).on('circle-animation-progress', (event: any, progress: any, stepValue: any) => {
      const percent = String(stepValue.toFixed(2).substr(2)) + "%";
      $(event.target).parent().find("span").text(percent);
    });
    
    $(".js .bar").circleProgress({
      value: 0.70
    });
    
    $(".node .bar").circleProgress({
      value: 0.90
    });
    
    $(".react .bar").circleProgress({
     
    });
  }

  getAllEvent() {
   



    const options = {
      startAngle: -1.55,
      size: 150,
      value: 0.85,
      fill: { gradient: ['#a445b2', '#fa4299'] }
    };
    
    $(".circle .bar").circleProgress(options).on('circle-animation-progress', (event: any, progress: any, stepValue: any) => {
      const percent = String(stepValue.toFixed(2).substr(2)) + "%";
      $(event.target).parent().find("span").text(percent);
    });
    
    $(".js .bar").circleProgress({
      value: 0.70
    });
    
    $(".node .bar").circleProgress({
      value: 0.90
    });
    
    $(".react .bar").circleProgress({
     
    });


   const viewAllBtn = document.getElementById("view-all-btn") as HTMLButtonElement;
   const viewAllForm = document.getElementById("view-all-form") as HTMLFormElement;
    
    viewAllBtn.addEventListener("click", () => {
      if (viewAllForm.style.display === "none") {
        viewAllForm.style.display = "block";
      } else {
        viewAllForm.style.display = "none";
      }
    });

   

  }
}

