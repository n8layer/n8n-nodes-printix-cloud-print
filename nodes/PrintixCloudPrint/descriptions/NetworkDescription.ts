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
				action: 'Create a network',
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
				action: "Delete a network",
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
				name: 'Query Many Networks',
				value: 'getMany',
				action: 'Query many networks',
				routing: {
					request: {
						method: 'GET',
						url: '/networks',
						qs: {
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedNetworks: '={{ $parameter.extractNetworkIds ? $response.body.networks.map(n => ({ ...n, networkId: n._links.self.href.split("/networks/")[1], siteId: n._links.site.href.split("/sites/")[1] })) : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedNetworks',
								},
							},
						],
					},
				},
			},
			{
				name: 'Retrieve A Network',
				value: 'getNetwork',
				description: 'Get network',
				action: 'Retrieve a network',
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
		displayName: 'Extract Network and Site IDs',
		name: 'extractNetworkIds',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract network IDs from URLs and return each network as a separate item. If disabled, returns the raw API response.',
	},
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
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['getMany'],
			},
		},
		default: 0,
		description: 'An integer value that indicates which page of the results to display if the list of networks is split over multiple pages',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['getMany'],
			},
		},
		default: 20,
		description: 'An integer value that indicates the number of results to display per page',
	},
];
