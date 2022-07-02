
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('Hero component (Shallow Tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id: 1, name: "Wonder Women", strength: 3};
        // fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('Wonder Women');
    })
   
    it('should render the hero name in the template by nativeElement', () => {
        fixture.componentInstance.hero = {id: 1, name: "Wonder Women", strength: 3};
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Wonder Women');
    })

    it('should render the hero name in the template by debugElement', () => {
        fixture.componentInstance.hero = {id: 1, name: "Wonder Women", strength: 3};
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('Wonder Women');
    })
})