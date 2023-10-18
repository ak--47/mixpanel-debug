declare module './utils.js' {
	export function getFromStorage(key: string): Promise<any>;
	export function setToStorage(key: string, value: any): Promise<void>;
	export function clearStorage(): Promise<void>;
	export function snapshotStorage(): Promise<any>;
	export function prettyJson(data : Object, ignoreKeys? : string[], indentLevel?: number): string;
  }

export {}