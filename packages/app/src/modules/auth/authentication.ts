/* eslint-disable no-underscore-dangle */

/**
 * A class representing a single authentication (wallet connection)
 */
import { DID } from "dids";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { ThreeIdProvider } from "@3id/did-provider";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { ModelTypeAliases } from "@glazed/types";
import AffiliateCeramicModel from "@usher/ceramic/models/Affiliate.json";

import { ceramicUrl } from "@/env-config";
import {
	Wallet,
	Partnership,
	CampaignReference,
	Chains,
	Connections
} from "@/types";

interface IDIDDataStore
	extends DIDDataStore<
		ModelTypeAliases<
			Record<string, any>,
			Record<string, string>,
			Record<string, string>
		>,
		string
	> {}
interface IDataModel
	extends DataModel<
		ModelTypeAliases<
			Record<string, any>,
			Record<string, string>,
			Record<string, string>
		>,
		any
	> {}

type MagicWallet = {
	arweave?: {
		address: string;
		data: string;
		created_at: number;
	};
};

class Auth {
	private _did!: DID;

	private _wallet!: Wallet;

	private _partnershipsId: string = ""; // Partnerships Stream ID

	private _partnerships: Partnership[] = [];

	private _ceramic;

	private model: IDataModel;

	private store: IDIDDataStore;

	constructor() {
		this._ceramic = new CeramicClient(ceramicUrl); // new instance of ceramic client for each DID;
		const model = new DataModel({
			ceramic: this._ceramic,
			aliases: AffiliateCeramicModel
		});
		const store = new DIDDataStore({ ceramic: this._ceramic, model });
		this.model = model;
		this.store = store;
	}

	public get did() {
		return this._did;
	}

	public get wallet() {
		return this._wallet;
	}

	public get partnerships() {
		return this._partnerships;
	}

	public get address() {
		return this._wallet.address;
	}

	public get ceramic() {
		return this._ceramic;
	}

	public async connect(
		address: string,
		secret: Uint8Array,
		chain: Chains,
		connection: Connections
	) {
		// Connect/Auth DID
		const threeIDAuth = await ThreeIdProvider.create({
			ceramic: this._ceramic,
			authId: address,
			authSecret: secret,
			getPermission: (request: any) => Promise.resolve(request.payload.paths)
		});

		const did = new DID({
			// Get the DID provider from the 3ID Connect instance
			provider: threeIDAuth.getDidProvider(),
			resolver: {
				...get3IDResolver(this._ceramic),
				...getKeyResolver()
			}
		});
		// Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
		// authentication flow using 3ID Connect and the Ethereum provider
		await did.authenticate();

		this._ceramic.did = did;

		this._did = did;

		// Load the Partnerships Stream
		const partnershipsData = await this.store.get("partnerships");
		console.log("partnershipsData", partnershipsData);
		const partnerships: Partnership[] = (partnershipsData || []).map(
			(campaignReferences: CampaignReference, i: number) => {
				return {
					id: i,
					campaign: campaignReferences
				};
			}
		) as Partnership[];

		this._partnerships = partnerships;

		this._wallet = {
			address,
			chain,
			connection,
			partnerships
		};
	}

	// Add Campaign to Partnerships Stream and load new index
	public async addPartnership(campaign: CampaignReference) {
		await this.store.set("partnerships", campaign);
		this._partnerships.push({
			id: this._partnerships.length + 1,
			campaign
		});
		return this._partnerships;
	}

	public getMagicWallets() {
		return this.store.get("magicWallets");
	}

	public addMagicWallet(wallet: MagicWallet) {
		return this.store.set("magicWallets", wallet);
	}
}

export default Auth;
