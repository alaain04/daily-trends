/* eslint-disable no-unused-vars */
export interface Logger {
    info(_message: string): void;
    warn(_message: string): void;
    error(_message: string): void;
    debug?(_message: string): void;
}
