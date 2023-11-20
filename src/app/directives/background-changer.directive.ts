import { Directive, Input, Renderer2 } from '@angular/core';

const BACKGROUND_TEN = '#e74c3c'
const BACKGROUND_MINUS_TEN = '#27ae60'

@Directive({
  selector: '[backgroundChanger]'
})
export class BackgroundChangerDirective {
  @Input() backgroundChanger: number
  constructor(private renderer: Renderer2) { }
  ngOnChanges() {
    if(this.backgroundChanger === 10) this.renderer.selectRootElement('body', true).style.backgroundColor = BACKGROUND_TEN
    if(this.backgroundChanger === -10) this.renderer.selectRootElement('body', true).style.backgroundColor = BACKGROUND_MINUS_TEN
  }
}
