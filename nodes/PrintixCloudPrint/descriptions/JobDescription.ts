import type { INodeProperties } from 'n8n-workflow';

export const jobOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'job',
				],
			},
		},
		options: [
			{
				name: 'Delete A Job',
				value: 'deleteJob',
				description: 'Delete a job by ID',
				action: 'Delete job',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/jobs/{{$parameter["jobId"]}}',
						body: {
							success: true,
						},
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many jobs',
				routing: {
					request: {
						method: 'GET',
						url: '/jobs',
					},
				},
			},
			{
				name: 'Get Job',
				value: 'getJob',
				description: 'Get a job',
				action: 'Get job',
				routing: {
					request: {
						method: 'GET',
						url: '=/jobs/{{$parameter["jobId"]}}',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const jobFields: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getJob'],
			},
		},
		default: '',
		description: 'The ID of the job to get',
	},
];