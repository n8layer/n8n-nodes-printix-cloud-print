import type { INodeProperties } from 'n8n-workflow';

export const printerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'printer',
				],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many printers',
				routing: {
					request: {
						method: 'GET',
						url: '/printers',
					},
				},
			},
			{
				name: 'Get Printer',
				value: 'getPrinter',
				description: 'Get a printer',
				action: 'Get printer',
				routing: {
					request: {
						method: 'GET',
						url: '/printers',
						qs: {
							id: '{{ $parameter.printerId }}',
							name: '{{ $parameter.printerName }}',
							serialNo: '{{ $parameter.serialNo }}',
							location: '{{ $parameter.location }}',
							model: '{{ $parameter.model }}',
							vendor: '{{ $parameter.vendor }}',
						},
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const printerFields: INodeProperties[] = [
	{
		displayName: 'Printer ID',
		name: 'printerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The ID of the printer to get',
	},
	{
		displayName: 'Printer Name',
		name: 'printerName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The name of the printer to get',
	},
	{
		displayName: 'Serial Number',
		name: 'serialNo',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The serial number of the printer',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The location of the printer',
	},
	{
		displayName: 'Model',
		name: 'model',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The model of the printer',
	},
	{
		displayName: 'Vendor',
		name: 'vendor',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getPrinter'],
			},
		},
		default: '',
		description: 'The vendor of the printer',
	},
];
