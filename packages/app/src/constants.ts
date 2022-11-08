// #region TargetEnv

import { ethereumProviderUrl } from "@/env-config";

enum TargetEnv {
	production = "production",
	staging = "staging",
	development = "development"
}

export const TARGET_ENV =
	Object.keys(TargetEnv).find(
		(e) => e === process.env.NEXT_PUBLIC_TARGET_ENV
	) ?? TargetEnv.production;

function byTargetEnv<T>({
	p,
	s,
	d
}: {
	/**
	 * value for `production` environment
	 */
	p: T;
	/**
	 * value for `staging` environment
	 */
	s: T;
	/**
	 * value for `development` environment
	 */
	d: T;
}) {
	switch (TARGET_ENV) {
		case TargetEnv.production:
			return p;
		case TargetEnv.staging:
			return s;
		default:
			return d;
	}
}

// #endregion

// #region Arweave constants

export const ARWEAVE_EXPLORER_ADDRESS_URL =
	"https://viewblock.io/arweave/address/" as const;

export const ARWEAVE_EXPLORER_TX_URL =
	"https://viewblock.io/arweave/tx/" as const;

export const ARCONNECT_CHROME_URL =
	"https://chrome.google.com/webstore/detail/arconnect/einnioafmpimabjcddiinlhmijaionap" as const;
export const ARCONNECT_FIREFOX_URL =
	"https://addons.mozilla.org/en-US/firefox/addon/arconnect/" as const;

// #endregion

// #region Ethereum constants

export const ETHEREUM_CHAIN_ID = byTargetEnv({
	p: "0x1",
	s: "0x5",
	d: "0x539"
});

export const ETHEREUM_RPC_URL = byTargetEnv({
	p: ethereumProviderUrl,
	s: ethereumProviderUrl,
	d: "http://localhost:8545"
});

export const ETHEREUM_CHAINS = byTargetEnv({
	p: [
		{
			id: ETHEREUM_CHAIN_ID,
			rpcUrl: ETHEREUM_RPC_URL,
			label: "Etherum Mainnet",
			token: "ETH"
		}
	],
	s: [
		{
			id: ETHEREUM_CHAIN_ID,
			rpcUrl: ETHEREUM_RPC_URL,
			label: "Goerli",
			token: "ETH"
		}
	],
	d: [
		{
			id: ETHEREUM_CHAIN_ID,
			rpcUrl: ETHEREUM_RPC_URL,
			label: "Localhost 8545",
			token: "ETH"
		}
	]
});

export const ETHEREUM_EXPLORER_ADDRESS_URL = byTargetEnv({
	p: "https://etherscan.io/address/",
	s: "https://goerli.etherscan.io/address/",
	d: "http://localhost:8549/address/"
});

export const ETHEREUM_EXPLORER_TX_URL = byTargetEnv({
	p: "https://etherscan.io/tx/",
	s: "https://goerli.etherscan.io/tx/",
	d: "http://localhost:8549/tx/"
});

export const METAMASK_CHROME_URL =
	"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" as const;
export const METAMASK_FIREFOX_URL =
	"https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" as const;

// #endregion

export const MAX_SCREEN_WIDTH = 1480 as const;

export const APP_DID =
	"did:key:z6MknpBzdxp69WYL4zRdsdRVSyq48iw5WsYdSGXSonXyGRoW" as const;

export const REFERRAL_TOKEN_DELIMITER = "_" as const;

export const FEE_MULTIPLIER = 0.1 as const;
export const FEE_ARWEAVE_WALLET =
	"ksFTLgrwQGtNrhRz6MWyd3a4lvK1Oh-QF1HYcEeeFVk" as const;
export const FEE_ETHEREUM_WALLET =
	"0x8D674B63BB0F59fEebc08565AbcB7fdfe3801817" as const;
