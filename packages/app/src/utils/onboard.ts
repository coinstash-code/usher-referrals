import { ETHEREUM_CHAINS } from "@/constants";
import coinbaseModule from "@web3-onboard/coinbase";
import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletconnectModule from "@web3-onboard/walletconnect";
import { OnboardAPI } from "@web3-onboard/core";
// import UsherIcon from "@/assets/logo/Usher-Logo-Icon";

const coinbase = coinbaseModule();
const injected = injectedModule();
const walletconnect = walletconnectModule();

let instance: OnboardAPI;

export enum ProviderLabel {
	ArConnect = "ArConnect",
	CoinbaseWallet = "Coinbase Wallet",
	MetaMask = "MetaMask",
	Magic = "Magic",
	WalletConnect = "WalletConnect"
}

export const initOnboard = () => {
	instance = init({
		wallets: [coinbase, injected, walletconnect],
		chains: ETHEREUM_CHAINS,
		appMetadata: {
			name: "Usher",
			description: "Uhser",
			// TODO: Import the icon
			icon: '<?xml version="1.0" encoding="utf-8" ?>	<!-- Generator: Assembly 2.4 - http://assemblyapp.co -->	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="4096.00" height="4096.00" viewBox="0 0 4096.0 4096.0">		<g id="document" transform="scale(13.653333333333334 13.653333333333334) translate(150.0 150.0)">			<g>				<path d="M13.9876,-64.4526 C14.2965,-66.3584 13.002,-68.1537 11.0962,-68.4626 C9.1904,-68.7715 7.39506,-67.4769 7.08617,-65.5711 C6.77729,-63.6654 8.07183,-61.87 9.97762,-61.5611 C11.8834,-61.2522 13.6788,-62.5468 13.9876,-64.4526 Z M57.0247,-38.0706 C57.3335,-39.9763 56.039,-41.7717 54.1332,-42.0806 C52.2274,-42.3895 50.4321,-41.0949 50.1232,-39.1891 C49.8143,-37.2833 51.1089,-35.488 53.0146,-35.1791 C54.9204,-34.8702 56.7158,-36.1648 57.0247,-38.0706 Z M68.4626,11.0962 C68.7715,9.1904 67.4769,7.39506 65.5711,7.08617 C63.6654,6.77729 61.87,8.07183 61.5611,9.97762 C61.2522,11.8834 62.5468,13.6788 64.4526,13.9876 C66.3584,14.2965 68.1537,13.002 68.4626,11.0962 Z M42.0806,54.1332 C42.3895,52.2274 41.0949,50.4321 39.1891,50.1232 C37.2833,49.8143 35.488,51.1089 35.1791,53.0146 C34.8702,54.9204 36.1648,56.7158 38.0706,57.0247 C39.9763,57.3335 41.7717,56.039 42.0806,54.1332 Z M-7.08617,65.5711 C-6.77729,63.6654 -8.07183,61.87 -9.97762,61.5611 C-11.8834,61.2522 -13.6788,62.5468 -13.9876,64.4526 C-14.2965,66.3584 -13.002,68.1537 -11.0962,68.4626 C-9.1904,68.7715 -7.39506,67.4769 -7.08617,65.5711 Z M-50.1232,39.1891 C-49.8143,37.2833 -51.1089,35.488 -53.0146,35.1791 C-54.9204,34.8702 -56.7158,36.1648 -57.0247,38.0706 C-57.3335,39.9763 -56.039,41.7717 -54.1332,42.0806 C-52.2274,42.3895 -50.4321,41.0949 -50.1232,39.1891 Z M-61.5611,-9.97762 C-61.2522,-11.8834 -62.5468,-13.6788 -64.4526,-13.9876 C-66.3584,-14.2965 -68.1537,-13.002 -68.4626,-11.0962 C-68.7715,-9.1904 -67.4769,-7.39506 -65.5711,-7.08617 C-63.6654,-6.77729 -61.87,-8.07183 -61.5611,-9.97762 Z M-35.1791,-53.0146 C-34.8702,-54.9204 -36.1648,-56.7158 -38.0706,-57.0247 C-39.9763,-57.3335 -41.7717,-56.039 -42.0806,-54.1332 C-42.3895,-52.2274 -41.0949,-50.4321 -39.1891,-50.1232 C-37.2833,-49.8143 -35.488,-51.1089 -35.1791,-53.0146 Z M-11.7339,-63.9469 C-11.425,-65.8527 -12.7196,-67.648 -14.6253,-67.9569 C-16.5311,-68.2658 -18.3265,-66.9713 -18.6354,-65.0655 C-18.9443,-63.1597 -17.6497,-61.3643 -15.7439,-61.0555 C-13.8381,-60.7466 -12.0428,-62.0411 -11.7339,-63.9469 Z M38.2327,-55.8485 C38.5416,-57.7543 37.247,-59.5496 35.3413,-59.8585 C33.4355,-60.1674 31.6401,-58.8728 31.3312,-56.9671 C31.0224,-55.0613 32.3169,-53.2659 34.2227,-52.957 C36.1285,-52.6481 37.9238,-53.9427 38.2327,-55.8485 Z M67.7031,-14.8081 C68.012,-16.7139 66.7175,-18.5092 64.8117,-18.8181 C62.9059,-19.127 61.1105,-17.8325 60.8017,-15.9267 C60.4928,-14.0209 61.7873,-12.2255 63.6931,-11.9167 C65.5989,-11.6078 67.3943,-12.9023 67.7031,-14.8081 Z M59.6271,35.0205 C59.936,33.1147 58.6414,31.3194 56.7356,31.0105 C54.8298,30.7016 53.0345,31.9961 52.7256,33.9019 C52.4167,35.8077 53.7113,37.6031 55.6171,37.912 C57.5228,38.2208 59.3182,36.9263 59.6271,35.0205 Z M18.7249,64.5133 C19.0337,62.6075 17.7392,60.8122 15.8334,60.5033 C13.9276,60.1944 12.1323,61.489 11.8234,63.3948 C11.5145,65.3005 12.8091,67.0959 14.7148,67.4048 C16.6206,67.7137 18.416,66.4191 18.7249,64.5133 Z M-31.2417,56.4149 C-30.9329,54.5091 -32.2274,52.7138 -34.1332,52.4049 C-36.039,52.096 -37.8343,53.3905 -38.1432,55.2963 C-38.4521,57.2021 -37.1576,58.9975 -35.2518,59.3064 C-33.346,59.6152 -31.5506,58.3207 -31.2417,56.4149 Z M-60.7346,15.5127 C-60.4257,13.6069 -61.7202,11.8115 -63.626,11.5027 C-65.5318,11.1938 -67.3272,12.4883 -67.636,14.3941 C-67.9449,16.2999 -66.6504,18.0953 -64.7446,18.4041 C-62.8388,18.713 -61.0435,17.4185 -60.7346,15.5127 Z M-52.6585,-34.3159 C-52.3496,-36.2217 -53.6442,-38.0171 -55.55,-38.3259 C-57.4557,-38.6348 -59.2511,-37.3403 -59.56,-35.4345 C-59.8689,-33.5287 -58.5743,-31.7334 -56.6685,-31.4245 C-54.7627,-31.1156 -52.9674,-32.4101 -52.6585,-34.3159 Z " fill="none" stroke-width="111.16" stroke="#01000d" stroke-linecap="square" stroke-linejoin="miter" />				<path d="M177.589,65.9753 L210.879,65.5714 L209.997,-7.1124 C209.943,-11.5511 210.447,-15.8116 211.507,-19.8939 C212.567,-23.9761 214.327,-27.6045 216.785,-30.7788 C219.244,-33.9532 222.358,-36.4881 226.127,-38.3836 C229.896,-40.279 234.554,-41.2604 240.103,-41.3277 C248.24,-41.4265 254.096,-39.0466 257.669,-34.1882 C261.243,-29.3297 263.08,-22.7392 263.181,-14.4166 L264.143,64.9252 L297.434,64.5214 L296.559,-7.60759 C296.507,-11.8614 296.965,-16.075 297.931,-20.2487 C298.898,-24.4223 300.518,-28.1414 302.79,-31.406 C305.063,-34.6706 307.991,-37.2958 311.574,-39.2814 C315.156,-41.2671 319.537,-42.2914 324.716,-42.3542 C329.709,-42.4148 333.788,-41.6319 336.952,-40.0055 C340.117,-38.3791 342.641,-36.1438 344.525,-33.2996 C346.409,-30.4554 347.744,-27.1421 348.53,-23.3596 C349.316,-19.5772 349.733,-15.6516 349.783,-11.5828 L350.698,63.8752 L383.989,63.4713 L383.026,-15.8705 C382.93,-23.8232 382.007,-31.2572 380.258,-38.1725 C378.51,-45.0878 375.708,-51.1116 371.854,-56.2441 C368,-61.3766 363.003,-65.3854 356.864,-68.2705 C350.725,-71.1556 343.217,-72.5443 334.339,-72.4366 C324.352,-72.3155 315.776,-70.223 308.612,-66.1591 C301.447,-62.0953 295.512,-55.7804 290.806,-47.2146 C283.764,-63.5918 269.793,-71.6536 248.894,-71.4001 C237.797,-71.2654 228.996,-68.7078 222.49,-63.727 C215.984,-58.7463 211.289,-53.0939 208.406,-46.7699 L207.851,-46.7631 L207.599,-67.5696 L175.973,-67.1859 L177.589,65.9753 Z " fill="#000000" fill-opacity="1.00" />			</g>		</g>	</svg>'
			// icon: UsherIcon
			// icon: "https://app.usher.so/_next/static/media/Logo-Icon.d0dcf2d1.svg"
		},
		connect: { showSidebar: false },
		accountCenter: {
			desktop: {
				enabled: false
			},
			mobile: {
				enabled: false
			}
		}
	});
};

export const onboard = () => instance;
