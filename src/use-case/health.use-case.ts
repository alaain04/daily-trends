import { Health } from '@src/domain/health/health.entities';

export default class AppHealthUseCase {
    protected healthMessage: string = 'Server up and running';

    async execute(): Promise<Health> {
        const health: Health = {
            message: this.healthMessage,
        };
        return Promise.resolve(health);
    }
}
