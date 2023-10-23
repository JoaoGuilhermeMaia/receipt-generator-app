import { Button, Col, Form, Input, InputNumber, Row, notification } from 'antd';
import './createCompany.sass';
import { Rule } from 'antd/es/form';
import { Link, useNavigate } from 'react-router-dom';
import request from '../../connect/connect';

export default function CreateCompany() {
	const navigate = useNavigate();
	const requiredField: Rule = {
		required: true,
		message: 'Campo necessário!',
	};

	const [form] = Form.useForm();

	function onFinish(data: any) {
		request.post("/company-receipt/save",
			{
				...data,
				userId: Number(localStorage.getItem("userId"))
			})
			.then((response) => {
				notification.success({
					message: 'Empresa salva com sucesso!',
				})
				navigate("/home");
			})
			.catch((response) => {
				notification.error({
					message: 'Erro ao salvar!',
					description: "Tente novamente mais tarde"
				})
				console.error(response);
			})
	}

	return (
		<div className="page-background page-create-account-main create-company-page">
			<div className='page-create-content'>
				<div className="header-content">
					<h3>
						Criar empresa
					</h3>
				</div>
				<Form
					form={form}
					className="form-content"
					onFinish={onFinish}
				>
					<Row wrap gutter={10}>
						<Col span={12}>
							<Form.Item
								name={"corporateName"}
								label="Razão Social"
								rules={[requiredField]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name={"cnpj"}
								label="CNPJ"
								rules={[requiredField]}
							>
								<InputNumber />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={10} className="submit-button">
						<Col>
							<Button type='text'>
								<Link onClick={() => form.resetFields()} to={"/home"}>
									Voltar
								</Link>
							</Button>
						</Col>
						<Col>
							<Button className='save-button' type="text" htmlType="submit">
								Salvar
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div >
	)
}