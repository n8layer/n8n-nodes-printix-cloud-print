import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { printerOperations } from './descriptions/PrinterDescription';

export class PrintixCloudPrint implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Printix Cloud Print',
		name: 'printixCloudPrint',
		icon: 'file:Printix.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Printix Cloud Print API',
		defaults: {
			name: 'Printix Cloud Print',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'printixCloudPrintOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...printerOperations,
		],
	};

// 	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
// 		const items = this.getInputData();
// 		const returnData: INodeExecutionData[] = [];

// 		const resource = this.getNodeParameter('resource', 0) as string;
// 		const operation = this.getNodeParameter('operation', 0) as string;

// 		for (let i = 0; i < items.length; i++) {
// 			try {
// 				if (resource === 'printer') {
// 					if (operation === 'getAll') {
// 						const response = await this.helpers.requestWithAuthentication.call(
// 							this,
// 							'printixCloudPrintOAuth2Api',
// 							{
// 								method: 'GET',
// 								url: '/printers',
// 							},
// 						);
// 						returnData.push({ json: response });
// 					} else if (operation === 'get') {
// 						const printerId = this.getNodeParameter('printerId', i) as string;
// 						const response = await this.helpers.requestWithAuthentication.call(
// 							this,
// 							'printixCloudPrintOAuth2Api',
// 							{
// 								method: 'GET',
// 								url: `/printers/${printerId}`,
// 							},
// 						);
// 						returnData.push({ json: response });
// 					}
// 				} else if (resource === 'printJob') {
// 					if (operation === 'getAll') {
// 						const response = await this.helpers.requestWithAuthentication.call(
// 							this,
// 							'printixCloudPrintOAuth2Api',
// 							{
// 								method: 'GET',
// 								url: '/printjobs',
// 							},
// 						);
// 						returnData.push({ json: response });
// 					} else if (operation === 'create') {
// 						// This would need more parameters for creating a print job
// 						// For now, just show the structure
// 						const response = await this.helpers.requestWithAuthentication.call(
// 							this,
// 							'printixCloudPrintOAuth2Api',
// 							{
// 								method: 'POST',
// 								url: '/printjobs',
// 								body: {
// 									// Print job parameters would go here
// 								},
// 							},
// 						);
// 						returnData.push({ json: response });
// 					}
// 				}
// 			} catch (error) {
// 				if (this.continueOnFail()) {
// 					returnData.push({
// 						json: { error: error.message },
// 						pairedItem: { item: i },
// 					});
// 					continue;
// 				}
// 				throw new NodeOperationError(this.getNode(), error as Error, {
// 					itemIndex: i,
// 				});
// 			}
// 		}

// 		return [returnData];
// 	}
}
