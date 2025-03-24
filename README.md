Author script: x.com/trangchongcheng

Group telegram về airdrop, blockchain: t.me/airdrop101xyz

Script farm airdrop Somnia Network, bao gồm làm nhiệm vụ:

1. Faucet token STT
2. Gửi và nhận token
3. Mint Ping Pong token
4. Swap Ping sang Pong và Pong sang Pin

## Cách chạy code

Nếu chưa từng chạy code nodejs thì hãy xem video này trước để cài nodejs + vscode

[![Xem Video Hướng Dẫn](https://img.youtube.com/vi/YMwiiN557yg/0.jpg)](https://youtu.be/YMwiiN557yg)

1. Thêm thông tin ví và proxy vào file

2. Cài đặt thư viện cần thiết

```
npm install
```

```
npm install -g typescript ts-node

```

3. Run code

## Faucet:

Faucet token STT, chỉ faucet cần 1 lần là được.

```
ts-node app/faucet.ts

```

## Trao đổi tx

Bạn nên setup chẵn số ví ở trong file config.ts, ví dụ 2 hoặc 4 hoặc 6 hoặc 8... vì để dễ trao đổi tx.
Ví dụ bạn có 10 ví thì ví 1 sẽ gửi cho ví 10, và ví 10 sẽ gửi lại cho ví 1.Vậy là bạn có 2 tx gửi và nhận để nhập vào quest thứ 3 trên:https://quest.somnia.network/

```
ts-node app/exchange.ts

```

## Mint token PING PONG

Mint token PING PONG để swap

```
ts-node app/mint-ping-pong.ts

```

## Swap PING -> PONG và ngược lại

Chạy swap PING sang PONG

```
ts-node app/swap-ping-to-pong.ts

```

Đợi swap PING sang PONG thì chạy swap PONG sang PING

```
ts-node app/swap-pong-to-ping.ts

```

Done!
