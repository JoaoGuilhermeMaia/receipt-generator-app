import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import Input from 'antd/es/input';
import './login.scss';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Login() {
	function handleFinishForm(values: Object) {
		console.log(values);
	}

	return (
		<div className='page-background page-login-main'>
			<div className='login-content'>
				<div className='header-content'>
					<h3>Login</h3>
				</div>
				<Form
					onFinish={handleFinishForm}
					name='login-form'>
					<Row className='form-content'>
						<Form.Item
							rules={[{
								type: 'email',
								message: 'Não é um email válido!',
							}]}
							required
							name='email'>
							<Input
								placeholder='Email'
								prefix={<UserOutlined className='site-form-item-icon' />}
							/>
						</Form.Item>
						<Form.Item
							required
							name='password'>
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
							<Button className='login-button' type='text' >
								Entrar
							</Button>
							<div>
								<div className='create-account-button'>
									Novo aqui?
								</div>
								<div className='create-account-button'>
									<Link to={"/create-account"}>
											Criar Conta
										</Link>
								</div>
							</div>
						</Row>
					</div>
				</Form>
			</div>
		</div>
	)
}