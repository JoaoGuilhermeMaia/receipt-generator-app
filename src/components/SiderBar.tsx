import { Icon } from '@iconify/react';
import { Button, Col, Layout, MenuProps, Row } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { log } from 'console';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './sideBar.sass';

interface Props {
	children: JSX.Element
}
export default function Sidebar({ children }: Props) {
	const { pathname } = useLocation();
	return (
		<Layout className='content-page'>
			{
				(!pathname.includes("/login") || !pathname.includes("/")) &&
				<Sider className='sider-content' width={"15%"}>
					<Menu
						mode="inline"
						theme="dark"
						inlineCollapsed={true}
					>
						<Row className='header-user'>
							<Col span={12}>
								<Icon icon="ph:user-circle" />
							</Col>
							<Col className='name-user'>
								Pedro Silva
							</Col>
						</Row>
						<Menu.Item>
							<NavLink to='/login'>
								Meus Dados
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink to='/'>
								Autonomos
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink to='/create-account'>
								Gerar Recibo
							</NavLink>
						</Menu.Item>
					</Menu>
					<NavLink to='/login'>
						<Button className='logout-button' icon={<Icon icon="material-symbols:logout" />}>
							Sair
						</Button>
					</NavLink>
				</Sider>
			}
			<Layout>
				{children}
			</Layout>
		</Layout>
	);
};