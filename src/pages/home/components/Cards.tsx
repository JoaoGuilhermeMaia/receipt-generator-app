import { Card, Col, Row } from "antd";
import { ICardsProps } from "../IHome";


export default function Cards({ data }: ICardsProps) {
	return (
		<div className="receive-cards">
			{
				data.map(receive => {
					return (
						<Card className="content">
							<Row>
								<Col span={6}>
									{receive.company}
								</Col>
								<Col span={6}>
									{receive.date}
								</Col>
								<Col span={6}>
									{receive.id}
								</Col>
								<Col span={6}>
									{receive.value}
								</Col>
							</Row>
						</Card>
					)
				})
			}
		</div>
	)
}