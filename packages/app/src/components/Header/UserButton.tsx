import React from "react";
import { UilUserCircle } from "@iconscout/react-unicons";
import {
	CogIcon,
	LogOutIcon,
	Menu,
	Popover,
	Position,
	useTheme
} from "evergreen-ui";
import Anchor from "@/components/Anchor";
import { useRedir, useUser } from "@/hooks";

import { MenuButton } from "@/components/Header/MenuButton"; // Import useUser hook

export const UserButton = ({
	height,
	onSettingsClick,
	onLogoutClick
}: {
	height: number;
	onSettingsClick: () => void;
	onLogoutClick: () => void;
}) => {
	const { colors } = useTheme();
	const { isAuthenticated } = useUser(); // Call useUser to get isAuthenticated
	const loginUrl = useRedir("/login");

	return isAuthenticated ? (
		<Popover
			position={Position.BOTTOM_RIGHT}
			content={
				<Menu>
					<Menu.Group>
						<Menu.Item icon={CogIcon} onClick={onSettingsClick}>
							Settings
						</Menu.Item>
						<Menu.Item icon={LogOutIcon} onClick={onLogoutClick}>
							Log Out
						</Menu.Item>
					</Menu.Group>
				</Menu>
			}
		>
			<MenuButton height={height}>
				<UilUserCircle size="32" color={colors.gray700} />
			</MenuButton>
		</Popover>
	) : (
		<Anchor href={loginUrl}>
			<MenuButton height={height}>
				<UilUserCircle size="32" color={colors.gray700} />
			</MenuButton>
		</Anchor>
	);
};
