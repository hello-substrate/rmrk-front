/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module "*.scss";
declare module '*.sass';
declare module '*.styl';

declare const APP_NAME: string;
declare const RPC: any;
declare const PROVIDER_SOCKET: string;
declare const DEVELOPMENT_KEYRING: any;
declare const isdebug: any;

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

