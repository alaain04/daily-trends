import { GetAppHealthUseCase } from '@src/use-case/health/retrieve-health.use-case';

class MockGetAppHealthUseCase extends GetAppHealthUseCase {
    protected healthMessage: string = 'Mocked health message';
}

describe('Get app health use case', () => {
    let getAppHealthUseCase: GetAppHealthUseCase;
    beforeEach(() => {
        getAppHealthUseCase = new MockGetAppHealthUseCase();
    });

    test('should return the mocked health message', async () => {
        const expectedResponse = { message: 'Mocked health message' };

        const result = await getAppHealthUseCase.execute();

        expect(result).toEqual(expectedResponse);
    });
});
