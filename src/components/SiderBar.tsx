import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { log } from 'console';
import React, { useState } from 'react';
import { BrowserRouter, Routes, redirect } from 'react-router-dom';

interface Props {
}
export default function Sidebar({ }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const menuItem = [
		{
			path: "/",
			name: "Dashboard",
		},
		{
			path: "/about",
			name: "About",
		},
		{
			path: "/analytics",
			name: "Analytics",
		},
		{
			path: "/comment",
			name: "Comment",
		},
		{
			path: "/product",
			name: "Product",
		},
		{
			path: "/productList",
			name: "Product List",
		}
	]
	return (
		<div className="container">
			<div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
				<div className="top_section">
					<h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
					<div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
						<FaBars onClick={toggle} />
					</div>
				</div>
				{
					menuItem.map((item, index) => (
						<NavLink to={item.path} key={index} className="link" activeclassName="active">
							<div className="icon">{item.icon}</div>
							<div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
						</NavLink>
					))
				}
			</div>
			<main>{children}</main>
		</div>
	);
};