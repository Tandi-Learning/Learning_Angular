import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'Spiderman', strength: 7},
      {id:2, name: 'Wonder Woman', strength: 8},
      {id:3, name: 'Superman', strength: 9},
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    component = new HeroesComponent(mockHeroService);
    component.heroes = HEROES;
  })

  describe('delete', () => {
    it ('should remove a hero from the list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.deleteHero(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero with correct parameter', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.deleteHero(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })

    it('should subscribe to deleteHero', () => {
      var reactiveResult = jasmine.createSpyObj('reactiveResult', ['deleteHero']);
      var $reactive = jasmine.createSpy('$reactive').and.returnValue(reactiveResult);
      expect(component).toBeTruthy();
    })
  })
})

