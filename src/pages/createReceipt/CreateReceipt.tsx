import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, notification } from "antd";
import "./createReceipt.sass";
import { useEffect, useState } from "react";
import { SelectData } from "./ICreateReceipt";
import request from "../../connect/connect";
import { Link, useNavigate } from "react-router-dom";
import { Rule } from "antd/es/form";
import locale from 'antd/es/date-picker/locale/pt_BR';

export default function CreateReceipt() {
	const isAutonomous = localStorage.getItem("userType")?.includes("autonomous")
	const [selectData, setSelectData] = useState<SelectData[]>([]);
	const [form] = Form.useForm();
	const requiredField: Rule = {
		required: true,
		message: 'Campo necessário!',
	};
	const navigate = useNavigate();

	useEffect(() => {
		const path = isAutonomous ? "/company-receipt/" : "";
		request.get(`${path}find-all/${localStorage.getItem("userId")}`)
			.then((response) => {
				setSelectData(response.data.map((item: any) => {
					return ({
						value: item.id,
						label: item.corporateName
					})
				}))
				console.log(response.data);
			})
			.catch((response) => {
				console.error(response);
			})
	}, [])

	function onFinish(data: any) {
		console.log(data);
		request.post(`/receipt/save`, {
			...data,
			initialDate: data.date[0],
			finalDate: data.date[1],
			isAutonomous: isAutonomous,
			userId: Number(localStorage.getItem("userId"))
		})
			.then((response) => {
				notification.success({ message: "hjahaha" });
				navigate("/home")
			})
			.catch((response) => {
				console.error(response);
			})
	}

	const downloadPDF = async (e?: any) => {
		await fetch('/api/gerarcupom', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			//   'Receba',
			//   "123",
			//   "123",
			//   "123",
			//   "123",
			//   "123",
			//   "123",
			//   "123",
			//   "123",
			}),
		  })
		  .then((res) => res.json())
		  .then((data) => {
			alert(data.link);
			// window.location = data.link;
		  });
	}

	return (
		<div className="page-background page-create-account-main page-create-receipt-main">
			<div className="page-create-content">
				<div className="header-content">
					<h3>
						Gerar recibo
					</h3>
				</div>
				<Form
					className="form-content"
					layout="vertical"
					onFinish={onFinish}
					form={form}
				>
					<Row gutter={20}>
						<Col span={12}>
							<Form.Item
								label={isAutonomous ? 'Selecione a empresa' : "Selecione o autônomo"}
								name={"selectedId"}
								rules={[requiredField]}
							>
								<Select
									options={selectData}

								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={"Valor"}
								name={"value"}
								rules={[requiredField]}
							>
								<InputNumber
									prefix={"R$"}
									decimalSeparator=","
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name={"serviceType"}
								label={"Tipo de serviço"}
								rules={[requiredField]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name={"date"}
								label={"Periodo"}
								rules={[requiredField]}
							>
								<DatePicker.RangePicker
									locale={locale}
									picker="date"
									format={"DD/MM/YYYY"}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row className="footer" gutter={30} align={"middle"}>
						<Col offset={9}>
							<Link onClick={() => form.resetFields()} to={"/home"}>
								Voltar
							</Link>
						</Col>
						<Col>
							<Button
								className="save-button" type="text" htmlType="submit"
							>
								Gerar recibo
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div >
	)
}