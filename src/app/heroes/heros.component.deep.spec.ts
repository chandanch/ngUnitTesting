import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input, Output, Directive, HostListener } from '@angular/core';
import { of } from 'rxjs/index';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
    selector: '[routerLink]',
    // host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click') onClick() {
        this.navigatedTo = this.linkParams;
    }
}

describe('HerosComponent (deep test)', () => {
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
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDebugElements.length).toBe(3);

    });

    it('should pass the right hero to HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
        for (let i = 0; i < heroComponentDebugElements.length; i++) {
            expect(heroComponentDebugElements[i].componentInstance.hero).toBe(HEROES[i]);
        }

    });

    it(`should call the delete() in the HerosComponent
        when delete button is clicked in HeroComponent`, () => {
            // spy on the the delete method to verify if its called
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            heroComponents[0].query(By.css('button'))
                // test the click event using triggerEventHandler()
                .triggerEventHandler('click', {stopPropagation: () => {}});

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it(`should call the delete() in the HerosComponent
        when delete event is raised by HeroComponent`, () => {
            // spy on the the delete method to verify if its called
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // trigger the delete event from child component(instead of triggering the click event).
            // here the child component just raises the event
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it(`should call the delete() in the HerosComponent
        and verify if delete event exist in HeroComponent`, () => {
            // spy on the the delete method to verify if its called
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            // trigger the delete event from child component(instead of triggering the click event).
            // here the child component just raises the event
            heroComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it('should add a new hero to hero list when add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroName = 'ValaMan';
        mockHeroService.addHero.and.returnValue(of({id: 5, name: heroName, strength: 20}));
        const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = heroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        expect(heroText).toContain(heroName);

    });

    it('should have the correct route for first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toEqual('/detail/1');
    })

});
