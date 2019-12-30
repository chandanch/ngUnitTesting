import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input, Output } from '@angular/core';
import { of } from 'rxjs/index';
import { Hero } from '../hero';

describe('HerosComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
    })

    // note: remove export keyword
    class FakeHeroComponent {
        @Input() hero: Hero;
        // @Output() delete = new EventEmitter();
    }

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpringMan', strength: 5},
            {id: 2, name: 'WaterDave', strength: 15},
            {id: 1, name: 'Beeman', strength: 25},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should bind data returned from getHeroes() of HeroService to heroes property', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // detechChanges() - Re-runs the lifecycle hook and fire the lifecycle event such as ngOnInit()
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toEqual(3);
    });
});
