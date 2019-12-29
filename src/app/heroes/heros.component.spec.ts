import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/index';

describe('HerosComponent', () => {
    let herosComponent: HeroesComponent;
    let HEROS;
    let mockHeroService;

    beforeEach(() => {
        HEROS = [
            {id: 1, name: 'SpringMan', strength: 5},
            {id: 2, name: 'WaterDave', strength: 15},
            {id: 1, name: 'Beeman', strength: 25},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        herosComponent = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should delete the passed hero from heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            herosComponent.heroes = HEROS;

            herosComponent.delete(HEROS[2]);

            expect(herosComponent.heroes.length).toEqual(2);
        });
    });
});
