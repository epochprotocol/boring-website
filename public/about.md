# About Epoch Protocol

Epoch Protocol is a non-custodial intent execution and solver coordination layer. An application defines a financial outcome — a cross-chain swap, a deposit, a payment, a protocol interaction — the user signs once with their own wallet, and Epoch quotes, routes, and executes that outcome across every chain, protocol, and payment rail. Multi-step actions that used to require a crypto desk collapse into one API call and one signature.

Execution is not trusted to a single privileged operator. Outcomes are settled by coordinated solvers competing to fill each intent; Epoch decomposes the intent, sources execution, and verifies the result against what was asked for. Compliance controls — KYC, sanctions screening, policy rules — run as blocking conditions inside the execution path, before any leg moves, so institutions can operate inside their existing obligations rather than around them.

Epoch is live on mainnet with phased per-intent limits, and it is already running in production: [Kismet](https://www.kismet.today/) uses Epoch for cross-chain purchases on Base. Integrators choose between an embedded widget, the Flows SDK for their own UI, and the Intents SDK & API for direct programmatic access — all three resolve to the same execution layer. The documentation at <https://docs.epochprotocol.xyz/> covers the full integration path, and the machine-readable surface is published at <https://epochprotocol.xyz/openapi.json>.

| | |
| --- | --- |
| Operating entity | Async Tech LLC — Singapore |
| Custody model | Non-custodial. Users sign with their own wallets; Epoch never holds keys or discretionary balances. |
| Network status | Mainnet, phased limits. |
| Contact | <https://epochprotocol.xyz/contact/> |

Agent orientation: <https://epochprotocol.xyz/llms.txt>
