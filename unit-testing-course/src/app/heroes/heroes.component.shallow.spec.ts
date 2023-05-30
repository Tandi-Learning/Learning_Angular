import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class MockHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();

    // onDeleteClick($event): void {
    //   $event.stopPropagation();
    //   this.delete.next();
    // }
  }

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      {id:1, name: 'Spiderman', strength: 7},
      {id:2, name: 'Wonder Woman', strength: 8},
      {id:3, name: 'Supermane', strength: 9},
    ]

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService
        }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should fetch heroes from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create a <li> for each test hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(HEROES.length);
  })
});
