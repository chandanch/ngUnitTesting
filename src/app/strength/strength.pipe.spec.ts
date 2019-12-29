import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {

    it('should return weak if value is less than 5', () => {
        // arrange
        const strengthPipe = new StrengthPipe;
        // act
        const val = strengthPipe.transform(5);
        // assert
        expect(val).toEqual('5 (weak)');
    });

    it('should return strong if value is between 10 & 20', () => {
        // arrange
        const strengthPipe = new StrengthPipe;
        // act
        const val = strengthPipe.transform(14);
        // assert
        expect(val).toEqual('14 (strong)');
    });

    it('should return unbelievable if value is above 20', () => {
        // arrange
        const strengthPipe = new StrengthPipe;
        // act
        const val = strengthPipe.transform(25);
        // assert
        expect(val).toEqual('25 (unbelievable)');
    });

});
