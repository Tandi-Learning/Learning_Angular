import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    heroService = TestBed.inject(HeroService);
  })

  describe('getHero', () => {

    it('should call get with the correct URL', () => {
    // ** alternative to using TestBed.inject **
    // it('should call get with the correct URL', inject(
    //   [HeroService, HttpTestingController],
    //   (heroService: HeroService, httpTestingController: HttpTestingController) => {

      // call getHero
      heroService.getHero(3).subscribe((hero) => {
        expect(hero.id).toBe(3);
      });

      // test that the URL is correct
      const req = httpTestingController.expectOne('api/heroes/3');

      req.flush({id: 3, name: 'Superman', strength: 9})
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })

  })

});
