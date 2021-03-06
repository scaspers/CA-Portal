export interface VehicleHistoryEntry {
	CompletionDate: Date;
	PartsDescription: string[];
	Description: string[];
	OrderId: string;
	Odometer: number;
	InvoiceLink: string;
	Amount: number;
	BalanceDue: number;
	Year: string;
	Make: string;
	Model: string;
}
