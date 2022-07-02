import { fakeAsync, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";

describe('Heroes Component', () => {
    let component: HeroesComponent;
    let heroes: Hero[];
    let mockHeroService;

    beforeEach(() => {
        heroes = [
            { id: 1, name: 'Batman', strength: 10 },
            { id: 2, name: 'Superman', strength: 8 },
            { id: 3, name: 'Wonder Women', strength: 7 }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

   describe('delete', () => {
    it('should remove the hero item deleted in the list', ()=> {
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = heroes;
        component.delete(heroes[0]);        
        expect(component.heroes.length).toBe(2);
    })

    it('should call deleteHero', () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        component.heroes = heroes;
        component.delete(heroes[0]); 
        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
    })

    it('should call subscribe on deleteHero', fakeAsync(() => {
        const response: Hero[] = heroes.filter(h => h !== heroes[0]);
        mockHeroService.deleteHero.and.returnValue(of(response));
        component.heroes = heroes;
        component.delete(heroes[0]); 
        tick();
        expect(component.heroes).toEqual(response);
    }));

    xit('this test will get skipped by Karma', () => {
        
    });
   }); 

});