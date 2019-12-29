import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/index';

describe('HerosComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpringMan', strength: 5},
            {id: 2, name: 'WaterDave', strength: 15},
            {id: 1, name: 'Beeman', strength: 25},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should bind data returned from getHeroes() of HeroService to heroes property', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toEqual(3);
    })
});
