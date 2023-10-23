import { Button, Card, Col, Row, notification } from "antd";
import { ICardsProps } from "../IHome";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import request from "../../../connect/connect";

export default function Cards({ data }: ICardsProps) {
	function onClickGenerated(id: number) {
		request.get(`/receipt/calc/${localStorage.getItem("userId")}`)
			.then(({ data }) => {
				console.log(data);
			})
			.catch((response) => {
				notification.error({
					message: 'Algo de errado com a requisição!',
				})
				console.error(response);
			})
	}

	return (
		<div className="receive-cards">
			{
				data.length ?
					<>
						<Row className="header">
							<Col span={5}>
								<h2>
									Nome
								</h2>
							</Col>
							<Col span={5}>
								<h2>
									Data
								</h2>
							</Col>
							<Col span={6}>
								<h2>
									Número do recibo
								</h2>
							</Col>
							<Col span={4}>
								<h2>
									Valor
								</h2>
							</Col>
							<Col span={4}>
								<h2>
									Gerar PDF
								</h2>
							</Col>
						</Row>
						{
							data.map(receive => {
								return (
									<Card key={receive.id} className="content">
										<Row>
											<Col span={5}>
												{receive.company.corporateName}
											</Col>
											<Col span={5}>
												{moment(receive.date).format("DD/MM/YYYY")}
											</Col>
											<Col span={6}>
												{receive.id + 1}
											</Col>
											<Col span={4}>
												{receive.value}
											</Col>
											<Col span={4}>
												<Button type="text" onClick={() => onClickGenerated(receive.id)} icon={<Icon icon="mingcute:pdf-fill" />} />
											</Col>
										</Row>
									</Card>
								)
							})
						}
					</>
					:
					<div className="empty-list">
						<h3>
							Ops... nenhum recibo cadastrado
						</h3>
						<Icon icon="lucide:list-x" />
					</div>
			}
		</div >
	)
}