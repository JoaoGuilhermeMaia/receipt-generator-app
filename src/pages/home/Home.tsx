import { useEffect, useState } from 'react'
import { IReceiveData } from '../../components/Interfaces'
import Cards from './components/Cards'
import './home.sass'
import { redirect, useNavigate, } from 'react-router-dom'
import request from '../../connect/connect'
import { notification } from 'antd'
import { ReceiptData } from './IHome'

export default function Home() {
	const navigate = useNavigate();
	const [receiptData, setReceiptData] = useState<ReceiptData[]>([]);

	useEffect(() => {
		console.log(localStorage.getItem("userId"));
		if (localStorage.getItem("userId") === "0") {
			navigate("/login");
			return;
		};

		request.get(`/receipt/find-all/${localStorage.getItem("userId")}`)
			.then(({ data }) => {
				console.log(data);
				setReceiptData(data);
			})
			.catch((response) => {
				notification.error({
					message: 'Algo de errado com a requisição!',
				})
				console.error(response);
			})

	}, [])


	return (
		<div className="page-background page-home-main">
			<div className="page-home-content">
				<h1>
					Últimos Recibos
				</h1>
				<Cards
					data={receiptData}
				/>
			</div>
		</div>
	)
}