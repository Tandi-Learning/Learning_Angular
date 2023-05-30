import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })

    fixture = TestBed.createComponent(HeroComponent);
  })

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Superman', strength: 10};
    expect(fixture.componentInstance.hero.name).toEqual('Superman');
  })

  it('should render hero name inside anchor tag', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Superman', strength: 10};
    fixture.detectChanges();

    let debugEl = fixture.debugElement.query(By.css('a'))
    expect(debugEl.nativeElement.textContent).toContain('Superman');

    let nativeEl = fixture.nativeElement.querySelector('a')
    expect(nativeEl.textContent).toContain('Superman');
  })
})
