import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('Heroes Component(Deep)', () => {
    let mockHeroService: any;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroes: Hero[];
            
    beforeEach(() => {
        heroes = [
            { id: 1, name: 'Batman', strength: 10 },
            { id: 2, name: 'Superman', strength: 8 },
            { id: 3, name: 'Wonder Women', strength: 7 }
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{
                provide: HeroService,
                useValue: mockHeroService
            }]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges();
    });

    it('should the hero component render first element matches with mock first element',() => {
        const heroCompDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroCompDebugElements[0].componentInstance.hero.name).toBe('Batman');
    })

    it('should the hero component renders each li element',() => {
        const heroCompDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroCompDebugElements.forEach((element, index) => {
            expect(element.componentInstance.hero).toEqual(heroes[index]);
        });
        expect(heroCompDebugElements.length).toEqual(3);
    })
    
});