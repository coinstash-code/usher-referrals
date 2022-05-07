import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import "modern-normalize";
import ContractProvider from "@/providers/Contract";
import { setup as setupSignals } from "@/utils/signals";
import GunProvider from "@/providers/Gun";
import "@/styles/styles.scss";

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		if (typeof window !== "undefined") {
			setupSignals();
		}
	}, []);

	const { seo = {} } = pageProps;

	return (
		<GunProvider>
			<ContractProvider>
				<main id="usher-app">
					<DefaultSeo title="Usher" {...seo} />
					<Component {...pageProps} />
				</main>
			</ContractProvider>
		</GunProvider>
	);
};

export default App;
