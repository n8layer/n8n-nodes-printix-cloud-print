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
				name: 'Change Owner',
				value: 'changeOwner',
				description: 'Change the owner of a job',
				action: 'Change owner',
				routing: {
					request: {
						method: 'POST',
						url: '=/jobs/{{$parameter["jobId"]}}/change-owner',
						body: {
							userEmail: '={{ $parameter.userEmail }}',
						},
					},
				},
			},
			{
				name: 'Complete Upload',
				value: 'completeUpload',
				description: 'Complete the upload process and notify Printix that the job is ready for printing',
				action: 'Complete upload',
				routing: {
					request: {
						method: 'POST',
						url: '=/jobs/{{$parameter["jobId"]}}/completeUpload',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					},
				},
			},
			{
				name: 'Delete A Job',
				value: 'deleteJob',
				description: 'Delete a job by ID',
				action: 'Delete a job',
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
				name: 'Retrieve A Single Job',
				value: 'getJob',
				description: 'Get a job',
				action: 'Retrieve a single job',
				routing: {
					request: {
						method: 'GET',
						url: '=/jobs/{{$parameter["jobId"]}}',
					},
				},
			},
			{
				name: 'Retrieve Jobs',
				value: 'getMany',
				action: 'Retrieve jobs',
				routing: {
					request: {
						method: 'GET',
						url: '/jobs',
						qs: {
							query: '={{ $parameter.query }}',
							page: '={{ $parameter.page }}',
							pageSize: '={{ $parameter.pageSize }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'jobs',
								},
							},
						],
					},
				},
			},
			{
				name: 'Submit Job',
				value: 'submitJob',
				description: 'Submit a new print job with specified printing options',
				action: 'Submit job',
				routing: {
					request: {
						method: 'POST',
						url: '=/printers/{{$parameter["printerId"]}}/queues/{{$parameter["queueId"]}}/submit',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'version': '1.1',
						},
						body: {
							color: '={{ $parameter.color === "true" }}',
							duplex: '={{ $parameter.duplex }}',
							page_orientation: '={{ $parameter.pageOrientation }}',
							copies: '={{ Number($parameter.copies) }}',
							media_size: '={{ $parameter.mediaSize }}',
							scaling: '={{ $parameter.scaling }}',
							userMapping: '={{ $parameter.userMapping ? JSON.parse($parameter.userMapping) : null }}',
						},
						qs: {
							title: '={{ $parameter.title }}',
							user: '={{ $parameter.user.toLowerCase().replace(/ /g, "+") }}',
							PDL: '={{ $parameter.pdl }}',
							releaseImmediately: '={{ $parameter.releaseImmediately }}',
						},
					},
				},
			}
		],
		default: 'getMany',
	},
];

export const jobFields: INodeProperties[] = [
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getJob', 'deleteJob', 'changeOwner', 'completeUpload'],
			},
		},
		default: '',
		description: 'The ID of the job',
	},
	{
		displayName: 'User Email',
		name: 'userEmail',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['changeOwner'],
			},
		},
		default: '',
		description: 'The email of the user to change the owner of the job to',
	},

	// Retrieve Jobs fields
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getMany'],
			},
		},
		default: '',
		description: 'Search query to filter jobs',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getMany'],
			},
		},
		default: 1,
		description: 'Page number for pagination',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getMany'],
			},
		},
		default: 20,
		description: 'Number of items per page',
	},
	{
		displayName: 'Extract Jobs Only',
		name: 'extractJobs',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['getMany'],
			},
		},
		default: true,
		description: 'Whether to extract only the jobs array from the response or return the full response body (currently always extracts jobs array)',
	},

	// Submit Job fields
	{
		displayName: 'Job Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: '',
		description: 'The title of the print job',
	},
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: '',
		description: 'The name of the user that is printing, for integration with third party print solutions',
	},
	{
		displayName: 'Printer ID',
		name: 'printerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: '',
		description: 'The ID of the printer to send the job to',
	},
	{
		displayName: 'Queue ID',
		name: 'queueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: '',
		description: 'The ID of the print queue to use',
	},
	{
		displayName: 'PDL',
		name: 'pdl',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'PCL5',
				value: 'PCL5',
			},
			{
				name: 'PCLXL',
				value: 'PCLXL',
			},
			{
				name: 'PDF',
				value: 'PDF',
			},
			{
				name: 'POSTSCRIPT',
				value: 'POSTSCRIPT',
			},
			{
				name: 'TEXT',
				value: 'TEXT',
			},
			{
				name: 'UFRII',
				value: 'UFRII',
			},
			{
				name: 'XPS',
				value: 'XPS',
			},
		],
		default: 'PDF',
		required: true,
		description: 'Optional: The Printer Document Language to use for the document to be printed, if it is not PDF',
	},
	{
		displayName: 'Release Immediately',
		name: 'releaseImmediately',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: true,
		description: 'Whether the print job should be released on the printer immediately after the onLoadCompleted link was invoked',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'True',
				value: 'true',
			},
			{
				name: 'False',
				value: 'false',
			},
		],
		default: 'true',
		description: 'Sets whether the document should be printed in color',
	},
	{
		displayName: 'Duplex',
		name: 'duplex',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'None',
				value: 'NONE',
			},
			{
				name: 'Long Edge',
				value: 'LONG_EDGE',
			},
			{
				name: 'Short Edge',
				value: 'SHORT_EDGE',
			},
		],
		default: 'NONE',
		description: 'Sets what kind of duplex to use to print the document, if any',
	},
	{
		displayName: 'Page Orientation',
		name: 'pageOrientation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'Portrait',
				value: 'PORTRAIT',
			},
			{
				name: 'Landscape',
				value: 'LANDSCAPE',
			},
			{
				name: 'Auto',
				value: 'AUTO',
			},
		],
		default: 'PORTRAIT',
		description: 'Sets the page orientation',
	},
	{
		displayName: 'Copies',
		name: 'copies',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: 1,
		description: 'A positive integer, representing the number of copies to print',
	},
	{
		displayName: 'Media Size',
		name: 'mediaSize',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'A0',
				value: 'A0',
			},
			{
				name: 'A1',
				value: 'A1',
			},
			{
				name: 'A2',
				value: 'A2',
			},
			{
				name: 'A3',
				value: 'A3',
			},
			{
				name: 'A4',
				value: 'A4',
			},
			{
				name: 'A5',
				value: 'A5',
			},
			{
				name: 'ANSI C',
				value: 'ANSIC',
			},
			{
				name: 'ANSI D',
				value: 'ANSID',
			},
			{
				name: 'ANSI E',
				value: 'ANSIE',
			},
			{
				name: 'ARCH C',
				value: 'ARCHC',
			},
			{
				name: 'ARCH D',
				value: 'ARCHD',
			},
			{
				name: 'ARCH E',
				value: 'ARCHE',
			},
			{
				name: 'B4',
				value: 'B4',
			},
			{
				name: 'B5',
				value: 'B5',
			},
			{
				name: 'COM10',
				value: 'COM10',
			},
			{
				name: 'DL',
				value: 'DL',
			},
			{
				name: 'Exec',
				value: 'EXEC',
			},
			{
				name: 'Executive',
				value: 'EXECUTIVE',
			},
			{
				name: 'ISO A0',
				value: 'ISOA0',
			},
			{
				name: 'ISO A1',
				value: 'ISOA1',
			},
			{
				name: 'ISO A2',
				value: 'ISOA2',
			},
			{
				name: 'ISO A3',
				value: 'ISOA3',
			},
			{
				name: 'ISO A4',
				value: 'ISOA4',
			},
			{
				name: 'ISO B3',
				value: 'ISOB3',
			},
			{
				name: 'ISO B4',
				value: 'ISOB4',
			},
			{
				name: 'ISO B5',
				value: 'ISOB5',
			},
			{
				name: 'JIS B4',
				value: 'JISB4',
			},
			{
				name: 'JIS B5',
				value: 'JISB5',
			},
			{
				name: 'Legal',
				value: 'LEGAL',
			},
			{
				name: 'Letter',
				value: 'LETTER',
			},
			{
				name: 'Monarch',
				value: 'MONARCH',
			},
			{
				name: 'Statement',
				value: 'STATEMENT',
			},
			{
				name: 'Tabloid',
				value: 'TABLOID',
			},
		],
		default: 'A4',
		description: 'Sets the page dimensions for the document to be printed',
	},
	{
		displayName: 'Scaling',
		name: 'scaling',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		options: [
			{
				name: 'No Scale',
				value: 'NOSCALE',
			},
			{
				name: 'Shrink',
				value: 'SHRINK',
			},
			{
				name: 'Fit',
				value: 'FIT',
			},
		],
		default: 'NOSCALE',
		description: 'Determines how the job should be scaled if at all; if set the document will be scaled to fit the page size',
	},
	{
		displayName: 'User Mapping',
		name: 'userMapping',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['job'],
				operation: ['submitJob'],
			},
		},
		default: '',
		description: 'Optional field. When specified, the API will assign the job to the user matching the mapping. Should be a JSON object with "key" and "value" fields (e.g., {"key": "AzureObjectId", "value": "12345"})',
		placeholder: '{"key": "AzureObjectId", "value": "user-ID"}',
	}

];
