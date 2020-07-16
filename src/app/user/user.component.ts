import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  // @ViewChild('navElement') navParent: ElementRef;
  @ViewChild('navElement') content: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(this.content);

  }
  ngAfterViewInit(): void {
    // console.log(this.content);
    const elements = this.content.nativeElement.childNodes;
    let counter = 0;
    elements.forEach(ele => {
      if(ele.classList.contains('active')){
      counter++;
      }
    });
    if (counter === 0){
      this.renderer.addClass(elements[0], 'active');
    } else if (counter > 1){
      elements.forEach(ele => {
        if (ele.classList.contains('active')){
          this.renderer.removeClass(ele, 'active');
        }
      });
      this.renderer.addClass(elements[counter - 1], 'active');
    }
  }

  onNavClick(event){
    const elements = event.currentTarget.childNodes;
    elements.forEach((ele) => {
     this.renderer.removeClass(ele, 'active');
    });
    // console.log(event);
    this.renderer.addClass(event.target, 'active');
  }
}
