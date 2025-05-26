import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

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
				name: 'PrintixCloudPrintOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.printix.net/cloudprint',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Printer',
						value: 'printer',
					},
					
				],
				default: 'printer',
			},
		],
	};
}