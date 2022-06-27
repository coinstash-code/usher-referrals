/**
 * We render a page first to load the user -- the use the dids to associate the result
 *
 * This page will accept the authentication token via the query parameter.
 */

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Pane, toaster } from "evergreen-ui";
import Preloader from "@/components/Preloader";
import { getAuthRequest } from "@/api";
import { useUser } from "@/hooks";

import LogoImage from "@/assets/logo/Logo.png";

const VerifyStart = () => {
	const {
		user: { wallets },
		isLoading
	} = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && wallets.length > 0) {
			const { token, redir } = router.query;
			if (!token) {
				toaster.danger(
					"Cannot start verification. Authentication is missing. Please connect a wallet starting verification."
				);
				return () => {};
			}
			(async () => {
				const authToken = token as string;
				const request = getAuthRequest(authToken);
				let qs = "";
				if (redir) {
					qs = `?redir=${redir}`;
				}
				const response: { success: boolean; redirectUri: string } =
					await request.get(`verify/start${qs}`).json();

				if (response.success) {
					// window.location.href = response.redirectUri;
					console.log("redirectUri", response.redirectUri);
				} else {
					toaster.danger(
						"Something has gone wrong initiating the verification. Please refresh the page or contact support."
					);
				}
			})();
		}
		const timeout = setTimeout(() => {
			if (!isLoading && wallets.length === 0) {
				toaster.notify("To start a verification, please login!");
				router.push("/login"); // redirect to login page if no wallets authenticated.
			}
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, [isLoading, wallets]);

	return (
		<Pane
			display="flex"
			flexDirection="column"
			marginY="0"
			marginX="auto"
			minHeight="100vh"
			position="relative"
		>
			<Preloader message={`Redirecting you to Personhood Verification...`} />
			<Pane
				zIndex={100}
				position="fixed"
				bottom={20}
				left={0}
				right={0}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Image src={LogoImage} width={150} objectFit="contain" />
			</Pane>
		</Pane>
	);
};

export const getStaticProps = async () => {
	return {
		props: {
			noUser: true
		}
	};
};

export default VerifyStart;
