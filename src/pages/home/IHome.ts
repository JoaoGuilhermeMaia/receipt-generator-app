import moment, { Moment } from "moment";
import { IReceiveData } from "../../components/Interfaces";

export interface IHomeProps {

}

export interface ICardsProps {
	data: ReceiptData[];
}

export interface ReceiptData {
	id: number;
	autonomous: AutonomousReceipt;
	company: CompanyReceipt;
	receiptNumber: number;
	userId: number;
	date: Moment;
	value: number;
}

export interface AutonomousReceipt {
	id: Number;
	name: string;
	pis: Number;
	cpf: Number;
	rg: Number;
	organShipper: string;
	city: string;
	serviceType: string;
	receipts: ReceiptData[];
}

export interface CompanyReceipt {
	id: Number;
	corporateName: string;
	cnpj: Number;
	receipts: ReceiptData[];
}
export interface ReceiptCalculation {
	initialDate: Date;
	finalDate: Date;
	discounts: number;
	companyReceipt: CompanyReceipt;
	autonomousReceipt: AutonomousReceipt;
	id: number;
	value: number;
}

export interface CompanyReceiptCalc {
	id: number;
	corporateName: string;
	cnpj: number;
	userId: number;
	receipts: any[];
}

export interface AutonomousReceiptCalc {
	id: number;
	name: string;
	pis: number;
	cpf: number | null;
	rg: number | null;
	organShipper: string;
	city: string | null;
	serviceType: string;
	userId: number;
	receipts: any[];
}
