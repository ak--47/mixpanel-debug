export type BrowserMessageType = 'getColorScheme' | 'gotColorScheme';

export type BrowserMessage = {
  type: BrowserMessageType;
  value?: any;
};

export type AppSettings = {
  displayHelpMessage: boolean;
};

export const DEFAULT_SETTINGS: AppSettings = {
  displayHelpMessage: true
};

export type ColorScheme = 'light' | 'dark';

export type ParsedRequest = {
  url: string;
  initiator: string | undefined;
  incognito: boolean | undefined;
  timeStamp: number;
  type: string;
  tabId: number;
  originUrl: string | undefined;
  endpoint: '/track' | '/engage' | '/unknown';
  records: any[];
};
