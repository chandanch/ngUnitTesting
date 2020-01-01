import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/index';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('HeroDetails', () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockHeroService, mockLocationService, mockActivatedRoute;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocationService = jasmine.createSpyObj(['back']);
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => {
                        return '3';
                    }
                }
            }
        };
        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            imports: [FormsModule],
            providers: [
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocationService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 1, name: 'WaterMan', strength: 100}));
    });

    it('should display hero name in h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('WATERMAN');
    });

    // use of fakeAsync provided by angular to handle async code
    it('should call updateHero() when save() is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of());
        fixture.detectChanges();

        fixture.componentInstance.save();
        // fast forwards the time in the zone to 250 millis
        // angular uses zone for handling async code, with tick the test will be part of the zone
        // with zone we can fast forward the time to make the code synchronous
        tick(250);

        expect(mockHeroService.updateHero).toHaveBeenCalled();

    }));

    it('should call updateHero() when save() is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of());
        fixture.detectChanges();

        fixture.componentInstance.save();
        // check if there are any tasks that are in waiting state in zone, if any tasks are waiting
        // then go ahead and fast forward the clock and execute the wating tasks
        // fast forwords the clock to make all async code synchronous
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();

    }));
});
