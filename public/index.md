# Epoch Protocol

> Rails for modern finance. Epoch Protocol is a non-custodial intent execution and solver coordination layer: an application defines a financial outcome, the user signs once with their own wallet, and Epoch quotes, routes, and executes it across every chain, protocol, and payment rail. Live on mainnet (phased per-intent limits). One API — every chain, any financial outcome. Operated by Async Tech LLC (Singapore).

## What Epoch does

- **Define the outcome. Epoch does the rest.** You specify the financial outcome — a cross-chain swap, a deposit, a payment, a protocol interaction — and Epoch handles the chains and rails underneath. No blockchain expertise required.
- **One signature.** Multi-step actions that used to require a crypto desk (bridge, swap, approve, execute) collapse into one signed intent. Funds stay in the user's own name: collateral sits in resource locks on settlement contracts controlled by the mandate the user signed, never in an operator's hot wallet.
- **Coordinated solvers.** Outcomes are settled by solvers competing to fill each intent, not by a single privileged executor. Epoch decomposes the intent, sources execution, and verifies the result.
- **Compliance inside the execution path.** KYC, sanctions screening, and your own policy rules run as blocking conditions before any leg executes — a failed check halts the outcome rather than flagging it after the fact.

## Three ways to integrate

1. **Widget** — embedded widget, the fastest path to accepting inbound from any chain, token, or fiat on-ramp.
2. **Flows SDK** — compose multi-step outcomes inside your own product surface, with your own UI.
3. **Intents SDK & API** — state the outcome directly; Epoch coordinates solvers and settlement.

## Networks

Seven networks live on mainnet: Ethereum, Base, Arbitrum, Optimism, Polygon, Miden (private, verifiable settlement), and BNB Chain. New networks are added on Epoch's side with no integration work on yours.

## For agents and integrators

- Agent guide: <https://epochprotocol.xyz/llms.txt>
- API specification (OpenAPI): <https://epochprotocol.xyz/openapi.json>
- Documentation: <https://docs.epochprotocol.xyz/>
- Intents SDK: <https://www.npmjs.com/package/@epoch-protocol/epoch-intents-sdk>
- CLI: <https://www.npmjs.com/package/epoch-intents-cli>

## Contact

- Sales: <mailto:sales@epochprotocol.xyz>
- Security: <mailto:security@epochprotocol.xyz>
- Contact page: <https://epochprotocol.xyz/contact/>
