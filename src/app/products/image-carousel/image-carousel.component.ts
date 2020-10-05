import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:5000,
    autoplaySpeed:800,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  images = [
    {
      text: "Everfresh Flowers",
      image: "https://nilsonline.lk/image/cache/catalog/nils/product/mainslideORGq2-2880x1180.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://nilsonline.lk/image/cache/catalog/nils/product/mainslideORddG2-2880x1180.jpg"
    },
    {
      text: "Morning Greens",
      image: "https://nilsonline.lk/image/cache/catalog/nils/product/WEB0410200-2880x1180.jpg"
    }
    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}