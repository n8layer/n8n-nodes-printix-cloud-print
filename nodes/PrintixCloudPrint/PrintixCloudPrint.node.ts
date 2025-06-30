import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { printerOperations, printerFields } from './descriptions/PrinterDescription';
import { userFields, userOperations } from './descriptions/UserDescription';
import { siteFields, siteOperations } from './descriptions/SiteDescription';
import { networkOperations, networkFields } from './descriptions/NetworkDescription';
import { groupOperations, groupFields } from './descriptions/GroupDescription';
import { jobOperations, jobFields } from './descriptions/JobDescription';
import { snmpOperations, snmpFields } from './descriptions/SNMPDescription';
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
		usableAsTool: true,
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
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Network',
						value: 'network',
					},
					{
						name: 'Printer',
						value: 'printer',
					},
					{
						name: 'Site',
						value: 'site',
					},
					{
						name: 'SNMP',
						value: 'snmp',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'printer',
			},
			...printerOperations,
			...printerFields,
			...siteOperations,
			...siteFields,
			...userOperations,
			...userFields,
			...networkOperations,
			...networkFields,
			...groupOperations,
			...groupFields,
			...jobOperations,
			...jobFields,
			...snmpOperations,
			...snmpFields,
		],
	};
}
