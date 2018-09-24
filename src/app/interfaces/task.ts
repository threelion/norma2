export interface Task {
	_id?: String;
	name: String;
	issuer: any;
	controller: any;
	executor: any;
	deadline: Date;
	status?: any;
	isInitialTask?: Boolean;
	taskType: any;
	issuedAt?: Date;
	executedAt?: Date,
	cancelationReason?: String,
	description: String,
	attachments? : Object[], 
	potentialDeal? : Object,
	customApp? : Object,
	contract? : Object,
	deliveries?: Object[],
	shipments?: Object[],
	outcomePayment?: Object,
	incomePayment?: Object,
	positions?: Object[],
}
