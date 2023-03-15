import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Row } from 'antd';
import Input from 'antd/es/input';
import './login.scss';

export default function Login() {

	return (
		<div className='page-login-main'>
			<div className='login-content'>
				<div className='header-content'>
					<h3>Login</h3>
				</div>
				<Form name='login-form'>
					<Row className='form-content'>
						<Form.Item name='email'>
							<Input
								placeholder='Email'
								prefix={<UserOutlined className='site-form-item-icon' />}
							/>
						</Form.Item>
						<Form.Item name='password'>
							<Input.Password
								placeholder="Senha"
							/>
						</Form.Item>
					</Row>
					<Row>
						<Button type='text' size='small'>
							Esqueceu a senha ?
						</Button>
					</Row>
				</Form>
			</div>
		</div>
	)
}