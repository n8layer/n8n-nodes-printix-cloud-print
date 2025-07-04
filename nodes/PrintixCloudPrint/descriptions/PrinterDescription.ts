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
				name: 'Get Printer Properties',
				value: 'getPrinter',
				description: 'Get a printer',
				action: 'Get printer properties',
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
			{
				name: 'List Printers',
				value: 'getMany',
				action: 'List printers',
				routing: {
					request: {
						method: 'GET',
						url: '/printers',
						qs: {
							query: '={{ $parameter.query }}',
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedPrinters: '={{ $parameter.extractPrinterIds ? $response.body.printers.map(p => ({ ...p, printerId: p._links.self.href.split("/printers/")[1].split("/")[0] })) : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedPrinters',
								},
							},
						],
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const printerFields: INodeProperties[] = [
	{
		displayName: 'Extract Printer IDs',
		name: 'extractPrinterIds',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to extract individual printer items with printerId field, or return raw response',
	},
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
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'A parameter used to look for printers whose name contains a specific sequence of characters',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getMany'],
			},
		},
		default: 0,
		description: 'An integer value that indicates which page of the results to display if the list of printers is split over multiple pages',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['printer'],
				operation: ['getMany'],
			},
		},
		default: 20,
		description: 'An integer value that indicates the number of results to display per page',
	},
];
