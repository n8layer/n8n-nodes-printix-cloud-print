import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'user',
				],
			},
		},
		options: [
			{
				name: 'Create User',
				value: 'createUser',
				description: 'Create a user',
				action: 'Create user',
				routing: {
					request: {
						method: 'POST',
						url: '/users/create',
						body: {
							email: '={{ $parameter.email }}',
							fullName: '={{ $parameter.fullName }}',
							role: '={{ $parameter.role }}',
							pin: '={{ $parameter.pin }}',
							password: '={{ $parameter.password }}',
							sendWelcomeEmail: '={{ $parameter.sendWelcomeEmail }}',
						},
					},
				},
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				description: 'Delete a user',
				action: 'Delete user',
				routing: {
					request: {
						method: 'POST',
						url: '=/users/{{$parameter["userId"]}}/delete',
					},
				},
			},
			{
				name: 'List Users',
				value: 'getUsers',
				description: 'Get users',
				action: 'List users',
				routing: {
					request: {
						method: 'GET',
						url: '/users',
						qs: {
							query: '={{ $parameter.query }}',
							role: '={{ $parameter.role }}',
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									extractedUsers: '={{ $parameter.extractUsers ? $response.body.users : [$response.body] }}',
								},
							},
							{
								type: 'rootProperty',
								properties: {
									property: 'extractedUsers',
								},
							},
						],
					},
				},
			},
			{
				name: 'Find User By ID',
				value: 'getUser',
				description: 'Get a user',
				action: 'Find user by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/users',
						body: {
							id: '={{ $parameter.userId }}',
						},
					},
				},
			},
		],
		default: 'getUsers',
	},

];

export const userFields: INodeProperties[] = [
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'USER',
				value: 'USER',
			},
			{
				name: 'GUEST_USER',
				value: 'GUEST_USER',
			},
		],
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: 'USER',
		description: 'The role of the user to get (optional)',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'Email address of the user',
	},
	{
		displayName: 'Full Name',
		name: 'fullName',
		type: 'string',
		placeholder: 'John Doe',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'Full name of the user',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'GUEST_USER',
				value: 'GUEST_USER',
			},
		],
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: 'GUEST_USER',
		description: 'Role of the user',
	},
	{
		displayName: 'Pin',
		name: 'pin',
		type: 'string',
		placeholder: '1234',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'Pin of the user',
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		placeholder: 'password',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'Password of the user',
	},
	{
		displayName: 'Send Welcome Email',
		name: 'sendWelcomeEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		default: false,
		description: 'Whether to send a welcome email to the user',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteUser', 'getUser'],
			},
		},
		default: '',
		description: 'ID of the user to delete',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: '',
		description: 'Query to search for users',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'USER',
				value: 'USER',
			},
			{
				name: 'GUEST_USER',
				value: 'GUEST_USER',
			},
		],
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: 'USER',
		description: 'Role to search for users',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: 0,
		description: 'Page number to retrieve',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: 20,
		description: 'Number of items per page',
	},
	{
		displayName: 'Extract Users',
		name: 'extractUsers',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsers'],
			},
		},
		default: false,
		description: 'Whether to extract just the users array from the response',
	},
];
