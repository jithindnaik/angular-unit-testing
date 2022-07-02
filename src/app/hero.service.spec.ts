import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MessageService } from "./message.service";

describe('Hero service', () => {
    let mockMessageService;
    let mockHeroService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {
                    provide: MessageService,
                    useValue: mockMessageService
                }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        mockMessageService = TestBed.inject(MessageService);
        mockHeroService = TestBed.inject(HeroService);
    })

    /* describe('getHero', inject([HeroService, HttpTestingController],(service: HeroService, controller: HttpTestingController)=> {
        it('should call get with the correct URL', ()=> {
            service.getHero(4).subscribe();
            controller.expectOne()
        })
    })) */

    describe('getHero', () => {
        it('should call get with the correct URL', ()=> {
            // mockHeroService.getHero(4).subscribe(res => expect(res.id).toBe(4));
            mockHeroService.getHero(4).subscribe();
            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id: 4, name: 'SuperDude', strength: 100});
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        })
    })
})