import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (deep)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      {id:1, name: 'Spiderman', strength: 7},
      {id:2, name: 'Wonder Woman', strength: 8},
      {id:3, name: 'Superman', strength: 9},
    ]

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
  })

  it('should render each here as HeroComponent', () => {

    // run ngOnInit inside the component
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponents.length).toEqual(3);
    expect(heroComponents[0].componentInstance.hero.name).toEqual('Spiderman');
  })

  it('should call heroService.deleteHero when delete button is clicked', () => {

    spyOn(fixture.componentInstance, 'deleteHero');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {
        stopPropagation: () => {}
      })

    expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  })

  it(`should call heroService.deleteHero when delete button is clicked
      (manually emit the event from child component)`, () => {

    spyOn(fixture.componentInstance, 'deleteHero');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const heroComponentInstance = heroComponents[0].componentInstance as HeroComponent;
    heroComponentInstance.delete.emit(undefined);

    expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  })

  it(`should call heroService.deleteHero when delete button is clicked
      (manually trigger event from child component)`, () => {

    spyOn(fixture.componentInstance, 'deleteHero');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should add new hero when add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroName = 'Captain Marvel';
    mockHeroService.addHero.and.returnValue(of({
      id: 4,
      name: heroName,
      strength: 9
    }));
    const inputEl = fixture.debugElement.query(By.css('input'));
    const addButtonEl = fixture.debugElement.queryAll(By.css('button'))[0];
    inputEl.nativeElement.value = heroName;
    addButtonEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroNameText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroNameText).toContain(heroName);
  })

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  })
});
