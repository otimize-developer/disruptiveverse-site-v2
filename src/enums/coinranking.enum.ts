export const COINRANKING_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_COINRANKING_ACCESS_TOKEN;

export enum CoinrankingEnum {
  WebSocketUrl = 'wss://api.coinranking.com/v2/real-time/rates',
  WebSocketThrottle = '10s',
}
