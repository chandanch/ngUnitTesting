import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { from } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Http } from '@angular/http';

describe('HeroService', () => {
    let mockMessageService;
    let httpController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        /*
        TestBed.get() - has access to the dependency injection registry of the TestBed module
        Looks into the dependency injection registry of the testbed module
        Finds a service that correlates to the one required
        Gives us a handle to it
        */
        httpController = TestBed.get(HttpTestingController);
        heroService = TestBed.get(HeroService);
    });

    describe('getHeros', () => {

        // use of inject() - not a cleaner approach
        // it('should make the get request with right URL', inject([HeroService, HttpTestingController],
        //     (service: HeroService, httpTestingController: HttpTestingController) => {
        //     service.getHero(4).subscribe();
        // }
        // ));

        it('should make get request with right URL', () => {

            heroService.getHero(4).subscribe();
            // heroService.getHero(3).subscribe();

            const req = httpController.expectOne('api/heroes/4');
            req.flush({ id: 4, name: 'SuperDude', strength: 12 });
            // verifies if there are any open requests - verifies exactly what was expected
            httpController.verify();
        });

    });

});
