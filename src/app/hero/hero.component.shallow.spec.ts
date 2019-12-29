import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow test)', () => {
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

        /*
        Debug Element is a wrapper that provides additional functionality when compared to nativeElement
        fixture.debugElement - obtains the root debug element
        query() - for querying for a specific element inside the root debug element
        query method accepts a predicate
        By - is a special library that built-in methods to select an element. Elements can be selected using css()
        debugElementAnchor.nativeElement - Every DOM element will be wrapped in a debug element, to access the
        actual native element we use the nativeElement property
        textContent - extracts text content from the anchor element
        */
        const debugElementAnchor = fixture.debugElement.query(By.css('a'));
        expect(debugElementAnchor.nativeElement.textContent).toContain('SuperMan');

        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
    })
});
