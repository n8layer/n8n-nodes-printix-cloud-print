import type { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'site',
				],
			},
		},
		options: [
			{
				name: 'Create A Site',
				value: 'createSite',
				description: 'Create site',
				action: 'Create site',
				routing: {
					request: {
						method: 'POST',
						url: '/sites',
						body: {
							name: '={{ $parameter.name }}',
							path: '={{ $parameter.path }}',
							adminGroupIds: [],
							networkIds: ['={{ $parameter.networkIds }}'],
						},
					},
				},
			},
			{
				name: 'Delete A Site',
				value: 'deleteSite',
				description: 'Delete site',
				action: 'Delete site',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/sites/{{$parameter["siteId"]}}',
						body: {
							success: true,
						},
					},
				},
			},
			{
				name: 'Get A Site',
				value: 'getSite',
				description: 'Get site',
				action: 'Get site',
				routing: {
					request: {
						method: 'GET',
						url: '=/sites/{{$parameter["siteId"]}}',
					},
				},
			},
			{
				name: 'Get Many Sites',
				value: 'getManySites',
				description: 'Get all sites',
				action: 'Get many sites',
				routing: {
					request: {
						method: 'GET',
						url: '/sites',
					},
				},
			},
			{
				name: 'Update A Site',
				value: 'updateSite',
				description: 'Update site',
				action: 'Update site',
				routing: {
					request: {
						method: 'PUT',
						url: '=/sites/{{$parameter["siteId"]}}',
						body: {
							name: '={{ $parameter.name }}',
							path: '={{ $parameter.path }}',
							adminGroupIds: ['={{ $parameter.adminGroupIds }}'],
							networkIds: ['={{ $parameter.networkIds }}'],
						},
					},
				},
			},
		],
		default: 'getManySites',
	},
];

export const siteFields: INodeProperties[] = [
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['getSite', 'updateSite'],
			},
		},
		default: '',
		description: 'The ID of the site',
	},
	{
		displayName: 'Site Path',
		name: 'path',
		type: 'string',
		placeholder: '/ElasticIT',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['updateSite'],
			},
		},
		default: '',
		description: 'The path of the site',
	},
	{
		displayName: 'Site Path',
		name: 'path',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createSite'],
			},
		},
		default: '',
		description: 'The path of the site',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createSite'],
			},
		},
		default: '',
		description: 'The name of the site',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['updateSite'],
			},
		},
		default: '',
		description: 'The name of the site',
	},
	{
		displayName: 'Admin Group IDs',
		name: 'adminGroupIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createSite', 'updateSite'],
			},
		},
		default: '',
		description: 'Comma-separated admin group IDs (leave empty for none)',
	},
	{
		displayName: 'Network IDs',
		name: 'networkIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['createSite', 'updateSite'],
			},
		},
		default: '',
		description: 'The network ID (e.g., "eb4977e1-eae1-4ed1-8631-856d152ff74e")',
	},
	{
		displayName: 'Site ID',
		name: 'siteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['deleteSite'],
			},
		},
		default: '',
		description: 'The ID of the site to delete',
	},
];