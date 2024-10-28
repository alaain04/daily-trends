export interface ILogger {
    info(_message: string): void;
    error(_message: string, _meta?: any[]): void;
}
