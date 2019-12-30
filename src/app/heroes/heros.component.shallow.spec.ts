import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input, Output } from '@angular/core';
import { of } from 'rxjs/index';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

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
        // detechChanges() - Triggers change detection cycle for a component and fires the lifecycle event such as ngOnInit()
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toEqual(3);
    });

    it('should create an li element for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

    it('should create an app-hero element for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('app-hero')).length).toBe(3);
    });
});
