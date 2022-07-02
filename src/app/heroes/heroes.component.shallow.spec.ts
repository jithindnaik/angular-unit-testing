import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('Heroes Component(Shallow)', () => {
    let mockHeroService: any;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroes: Hero[];
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
    class MockHeroComponent {
        @Input() hero: Hero;
      }
            
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
                MockHeroComponent
            ],
            // schemas: [NO_ERRORS_SCHEMA],
            providers: [{
                provide: HeroService,
                useValue: mockHeroService
            }]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should Heroes component did call the service', ()=> {
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges(); // calls lifecycle methods
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li for each hero', ()=> {
        mockHeroService.getHeroes.and.returnValue(of(heroes));
        fixture.detectChanges(); // calls lifecycle methods
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
});