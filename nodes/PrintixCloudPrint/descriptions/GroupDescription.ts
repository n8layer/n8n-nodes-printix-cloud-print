import type { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'group',
				],
			},
		},
		options: [
			{
				name: 'Create A Group',
				value: 'createGroup',
				action: 'Create a group',
				routing: {
					request: {
						method: 'POST',
						url: '/groups',
						body: {
							name: '{{ $parameter.name }}',
							externalId: '{{ $parameter.externalId }}',
							identityProvider: '{{ $parameter.identityProvider }}',
							description: '{{ $parameter.description }}',
						},
					},
				},
			},
			{
				name: 'Delete A Group',
				value: 'deleteGroup',
				action: 'Delete a group',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/groups/{{$parameter["groupId"]}}',
						body: {
							success: true,
						},
					},
				},
			},
			{
				name: 'Fetch Group Details',
				value: 'getSingleGroup',
				description: 'Fetch a single group by ID',
				action: 'Fetch group details',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter["groupId"]}}',
					},
				},
			},
			{
				name: 'List Groups',
				value: 'getMany',
				action: 'List groups',
				routing: {
					request: {
						method: 'GET',
						url: '/groups',
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
									extractedGroups: '={{ $parameter.extractGroupIds ? $response.body.groups.map(g => ({ ...g, groupId: g._links.self.href.split("/groups/")[1] })) : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedGroups',
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

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Extract Group IDs',
		name: 'extractGroupIds',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract group IDs from URLs and return each group as a separate item. If disabled, returns the raw API response.',
	},
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getSingleGroup', 'deleteGroup'],
			},
		},
		default: '',
		description: 'The ID of the group',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: 'The name of the group to create',
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: 'The external ID of the group to create',
	},
	{
		displayName: 'Identity Provider',
		name: 'identityProvider',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: 'The identity provider of the group to create',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup'],
			},
		},
		default: '',
		description: 'The description of the group to create',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'The query to search for groups',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getMany'],
			},
		},
		default: 0,
		description: 'The page number to fetch',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getMany'],
			},
		},
		default: 20,
		description: 'The number of groups to fetch per page',
	},
];
