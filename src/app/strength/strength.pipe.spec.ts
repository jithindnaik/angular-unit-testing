import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength < 10', () => {
        // arrange
        let pipe = new StrengthPipe();

        // act
        let val = parseInt(pipe.transform(9));

        // assert
        expect(val).toBeLessThan(10);
    })

    it('should display strong if value >= 10 && value < 20', () => {
        // arrange
        let pipe = new StrengthPipe();

        // act
        let range = parseInt(pipe.transform(10));

        // assert
        expect(range>=10 && range<20).toBeTruthy();
    })
})