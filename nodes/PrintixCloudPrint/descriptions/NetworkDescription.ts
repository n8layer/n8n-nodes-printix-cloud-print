import type { INodeProperties } from 'n8n-workflow';

export const networkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'network',
				],
			},
		},
		options: [
			{
				name: 'Create A Network',
				value: 'createNetwork',
				description: 'Create network',
				action: 'Create network',
				routing: {
					request: {
						method: 'POST',
						url: '/networks',
						body: {
							name: '={{ $parameter.name }}',
							homeOffice: '={{ $parameter.homeOffice }}',
							clientMigratePrintQueues: '={{ $parameter.clientMigratePrintQueues }}',
							airPrint: '={{ $parameter.airPrint }}',
							gateways: [
								{
									mac: '={{ $parameter.macAddressGateway }}',
									ip: '={{ $parameter.ipAddressGateway }}',
								},
							],
							siteId: '={{ $parameter.siteId || null }}',
						},
					},
				},
			},
			{
				name: "Delete A Network",
				value: "deleteNetwork",
				description: "Delete network",
				action: "Delete network",
				routing: {
					request: {
						method: "DELETE",
						url: '=/networks/{{$parameter["networkId"]}}',
						body: {
							success: true,
						},
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many networks',
				routing: {
					request: {
						method: 'GET',	
						url: '/networks',
					},
				},
			},
			{
				name: 'Get A Network',
				value: 'getNetwork',
				description: 'Get network',
				action: 'Get network',
				routing: {
					request: {
						method: 'GET',
						url: '=/networks/{{$parameter["networkId"]}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const networkFields: INodeProperties[] = [
	{
		displayName: 'Network ID',
		name: 'networkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['getNetwork', 'deleteNetwork'],
			},
		},
		default: '',
		description: 'The ID of the network',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: '',
		description: 'The name of the network to create',
	},
	{
		displayName: 'Home Office',
		name: 'homeOffice',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: false,
		description: 'Whether the network is a home office network',
	},
	{
		displayName: 'Client Migrate Print Queues',
		name: 'clientMigratePrintQueues',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: false,
		description: 'Whether the network is a client migrate print queues network',
	},
	{
		displayName: 'Air Print',
		name: 'airPrint',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: false,
		description: 'Whether the network is an air print network',
	},
	{
		displayName: 'MAC Address Gateway',
		name: 'macAddressGateway',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: '',
		description: 'The MAC address gateway of the network to create',
	},
	{
		displayName: "IP Address Gateway",
		name: "ipAddressGateway",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: '',
		description: 'The IP address gateway of the network to create',
	},
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['createNetwork'],
			},
		},
		default: '',
		description: 'The ID of the site to create (optional)',
	},
];