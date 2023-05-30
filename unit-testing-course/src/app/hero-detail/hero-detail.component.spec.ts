import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {

    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3' }}}
    }
    mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ]
    })

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'Hulk', strength: 10}));
  })

  it('should render hero name in h2 tag', () => {
    fixture.detectChanges();

    console.log(fixture.nativeElement.querySelector('h2'))
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Hulk'.toUpperCase());
  })

  it('should call updateHero when save is called (fakeAsync)', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveDebounce();
    tick(250); // call flush() if we don't know how long to wait
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))

  it('should call updateHero when save is called (waitForAsync)', waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.savePromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  }))
});
