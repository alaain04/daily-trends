export default abstract class UseCase {
  abstract execute(...args: any): Promise<any>;
}
