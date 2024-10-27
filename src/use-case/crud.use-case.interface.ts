export interface ICrudUseCase<T> {
    create(obj: T): Promise<T>;
    update(id: string, obj: T): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    getById(id: string): Promise<T | null>;
}
