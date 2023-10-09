import { Button, Card, Col, Row, notification } from "antd";
import { ICardsProps, ReceiptCalculation } from "../IHome";
import moment from "moment";
import { Icon } from "@iconify/react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import request from "../../../connect/connect";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from "jspdf-autotable";

export default function Cards({ data }: ICardsProps) {
	function onClickGenerated(id: number) {
		request.get(`/receipt/doCalc/${id}`)
			.then((response) => {
				const result = response.data as ReceiptCalculation;
				console.log(result);

				const doc = new jsPDF();

				// It can parse html:
				// <table id="my-table"><!-- ... --></table>
				autoTable(doc, { html: '#table-receipt' })

				// Or use javascript directly:
				autoTable(doc, {
					head: [['Num. do recibo', 'Valor', 'Desconto total', 'Data inicial', 'Data final', 'PIS', 'CNPJ', 'Valor Final']],
					body: [
						[
							result.id,
							result.value,
							result.discounts,
							moment(result.initialDate).format("DD/MM/YYYY"),
							moment(result.finalDate).format("DD/MM/YYYY"),
							result.autonomousReceipt.pis.toString(),
							result.companyReceipt.cnpj.toString(),
							`${result.value} - ${result.discounts} = ${result.value - result.discounts}`
						],
					],
				})
				doc.save(`Recibo-${result.id}.pdf`)
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