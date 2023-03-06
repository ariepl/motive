export enum LogLevel {
	None,
	Error,
	Warning,
	Info,
}

// tslint:disable:no-any
export class GtnLogger {
	private static logLevel = LogLevel.Info;

	public static setLogLevel(logLevel: LogLevel) {
		this.logLevel = logLevel;
	}

	public static log(message: string, ...params: any[]) {
		this.logInternal(LogLevel.Info, message, params);
	}

	public static warn(message: string, ...params: any[]) {
		this.logInternal(LogLevel.Warning, message, params);
	}

	public static error(message: string, ...params: any[]) {
		this.logInternal(LogLevel.Error, message, params);
	}

	private static logInternal(level: LogLevel, message: string, params: any[]) {
		if (message && level <= this.logLevel) {
			this.getLogFunction(level)(message, ...params);
		}
	}

	private static getLogFunction(level: LogLevel): (message: string, ...params: any[]) => void {
		switch (level) {
			case LogLevel.Error: {
				return console.error;
			}
			case LogLevel.Warning: {
				return console.warn;
			}
			default: {
				return console.log;
			}
		}
	}
}
