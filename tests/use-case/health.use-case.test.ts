import AppHealthUseCase from '@src/use-case/health.use-case';

class MockAppHealthUseCase extends AppHealthUseCase {
    protected healthMessage: string = 'Mocked health message';
}

describe('Get app health use case', () => {
    let getAppHealthUseCase: AppHealthUseCase;

    beforeEach(() => {
        getAppHealthUseCase = new MockAppHealthUseCase();
    });

    test('should return the mocked health message', async () => {
        const expectedResponse = { message: 'Mocked health message' };

        const result = await getAppHealthUseCase.execute();

        expect(result).toEqual(expectedResponse);
    });
});
