import { IReceiveData } from '../../components/Interfaces'
import Cards from './components/Cards'
import './home.sass'

export default function Home() {
	const data: IReceiveData[] = [
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},

		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		}, {
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
		{
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		}, {
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		}, {
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		}, {
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		}, {
			company: "Totvs",
			date: "20/03/2022",
			id: 321,
			value: 600
		},
	]

	return (
		<div className="page-background page-home-main">
			<div className="page-home-content">
				<h1>
					Últimos Recibos
				</h1>
				<Cards
					data={data}
				/>
			</div>
		</div>
	)
}