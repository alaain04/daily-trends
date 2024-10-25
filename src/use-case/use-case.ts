export default abstract class UseCase {
    // eslint-disable-next-line no-unused-vars
    abstract execute(...args: any): Promise<any>;
}
