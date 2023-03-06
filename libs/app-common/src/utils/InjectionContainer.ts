import { container } from 'tsyringe';

declare type constructor<T> = new (...args: any[]) => T;

class InjectionContainer {
	static resolve<T>(token: constructor<T> | symbol): T {
		return container.resolve(token);
	}
}

export default InjectionContainer;
