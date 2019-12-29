import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow test', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have right hero', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SuperMan', strength: 3};

        expect(fixture.componentInstance.hero.name).toEqual('SuperMan');
    });

    it('should bind name in anchor tag', () => {
        fixture.componentInstance.hero = {id: 1, name: 'SuperMan', strength: 3};
        fixture.detectChanges();

        const debugElementAnchor = fixture.debugElement.query(By.css('a'));
        expect(debugElementAnchor.nativeElement.textContent).toContain('SuperMan');

        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
    })
});
