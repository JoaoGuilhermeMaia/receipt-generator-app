import { Button, Col, Form, Row, notification } from 'antd';
import Input from 'antd/es/input';
import './login.scss';
import { Icon } from '@iconify/react';
import { Link, redirect, unstable_HistoryRouter, HistoryRouterProps, useNavigate } from 'react-router-dom';
import { IRequestResponse } from '../../utils/GenericInterface';
import { useForm } from 'antd/es/form/Form';
import { UserOutlined } from '@ant-design/icons';
import request from '../../connect/connect';

export default function Login() {
	const [form] = useForm();
	const history = [unstable_HistoryRouter];
	const navigate = useNavigate();
	function handleFinishForm(values: Object) {
		request.post("/user/login", values)
			.then(({ data }) => {
				localStorage.setItem("userId", data["id"]);
				localStorage.setItem("userName", data["name"]);
				localStorage.setItem("userType", data["accountType"]);
				navigate("/home")
			})
			.catch((response) => {
				notification.error({
					message: 'Email ou senha incorretos!',
				})
				console.error(response);
			})
	}

	return (
		<div className='page-background page-login-main'>
			<div className='login-content'>
				<div className='header-content'>
					<h3>Login</h3>
				</div>
				<Form
					onFinish={handleFinishForm}
					name='login-form'
				>
					<Row className='form-content'>
						<Form.Item
							rules={[{
								type: 'email',
								message: 'Não é um email válido!',
								required: true
							}]}
							required
							name='email'
						>
							<Input
								placeholder='Email'
								prefix={<UserOutlined className='site-form-item-icon' />}
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[{
								type: 'string',
								required: true,
								message: "Senha inválida"
							}]}
						>
							<Input.Password
								prefix={<Icon icon="mdi:password" />}
								placeholder="Senha"
							/>
						</Form.Item>
					</Row>
					<div className='footer-form-content'>
						<Row>
							<Col>
								<Button type='text' size='small'>
									Esqueceu a senha?
								</Button>
							</Col>
						</Row>
						<Row className='row-login-button'>
							<Button htmlType='submit' className='login-button' type='text' >
								Entrar
							</Button>
							<div>
								<div className='create-account-button'>
									Novo aqui?
								</div>
								<div className='create-account-button'>
									<Link onClick={() => form.resetFields()} to={"/create-account"}>
										Criar Conta
									</Link>
								</div>
							</div>
						</Row>
					</div>
				</Form>
			</div >
		</div >
	)
}