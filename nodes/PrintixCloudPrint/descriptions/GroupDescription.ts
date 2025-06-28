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
				name: 'Get A Group',
				value: 'getGroup',
				action: 'Get a group',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter["groupId"]}}',
					},
				},
			},
			{
				name: 'Get Many Groups',
				value: 'getMany',
				action: 'Get many groups',
				routing: {
					request: {
						method: 'GET',
						url: '/groups',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroup'],
			},
		},
		default: '',
		description: 'The ID of the group to get',
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
];