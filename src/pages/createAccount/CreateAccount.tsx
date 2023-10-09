import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Row, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import './createAccount.scss';
import { Rule } from "antd/es/form";
import { MaskedInput } from "antd-mask-input";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import locale from 'antd/es/date-picker/locale/pt_BR';
import request from "../../connect/connect";

export default function CreateAccount() {
	const [form] = useForm();
	const navigate = useNavigate();
	const requiredField: Rule = {
		required: true,
		message: 'Campo necessário!',
	};
	const isAutonomous = Form.useWatch("isAutonomous", form);

	function handleSubmit(data: any) {
		request.post("/user/create-account", data)
			.then((response) => {
				notification.success({
					message: "Conta criada com sucesso!",
				})
				navigate("/login");
			})
			.catch((response) => {
				notification.error({
					message: "Email já utilizado!"
				})
				console.error(response);
			})
	}
	return (
		<div className="page-background page-create-account-main">
			<div className="page-create-content">
				<div className="header-content">
					<h3>
						Criar conta
					</h3>
				</div>
				<Form
					form={form}
					layout="vertical"
					className="form-content"
					onFinish={handleSubmit}
				>
					<Row wrap gutter={20}>
						<Col span={12}>
							<Form.Item
								label={isAutonomous ? "Nome" : "Razão Social"}
								name={"name"}
								rules={[requiredField]}
								hasFeedback
							>
								<Input type="text" placeholder="João da Silva" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={"Email"}
								name={"email"}
								hasFeedback
								rules={[{
									type: 'email',
									message: 'Não é um email válido!',
									required: true
								}]}
							>
								<Input type="email" placeholder="joao@gmail.com" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={"Senha"}
								name={"password"}
								rules={[requiredField]}
								hasFeedback
							>
								<Input.Password placeholder="*********" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="confirmPassword"
								label="Confirmação de senha"
								dependencies={['password']}
								hasFeedback
								rules={[
									requiredField,
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(new Error('As senhas não são iguais!'));
										},
									}),
								]}
							>
								<Input.Password placeholder="*********" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="phone"
								label="Telefone"
								hasFeedback
								rules={[requiredField]}
							>
								<MaskedInput mask="(00) 00000-0000" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="isAutonomous"
								label="Tipo da conta"
								hasFeedback
								rules={[requiredField]}
								initialValue={true}
							>
								<Radio.Group>
									<Radio value={true}>
										Autônomo
									</Radio>
									<Radio value={false}>
										Empresa
									</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="accountCode"
								label={isAutonomous ? "CPF" : "CNPJ"}
								hasFeedback
								rules={[requiredField]}
							>
								<InputNumber />
							</Form.Item>
						</Col>
						{isAutonomous ?
							<>
								<Col span={12}>
									<Form.Item
										name="pis"
										label={"PIS"}
										rules={[requiredField]}
									>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="rg"
										label={"RG"}
										rules={[requiredField]}
									>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="organShipper"
										label={"Orgão expedidor"}
										rules={[requiredField]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="birthDate"
										label={"Data de nascimento"}
										hasFeedback
										rules={[requiredField]}
									>
										<DatePicker
											locale={locale}
											picker="date"
											format={"DD/MM/YYYY"}
										/>
									</Form.Item>
								</Col>
							</>
							:
							<>

							</>
						}
					</Row>
					<Row className="submit-button">
						<Col>
							<Button className="save-button" type="text" htmlType="submit">
								Confirmar
							</Button>
						</Col>
					</Row>
					<Row className="submit-button">
						<Col>
							<Link onClick={() => form.resetFields()} to={"/login"}>
								Voltar
							</Link>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	)
}