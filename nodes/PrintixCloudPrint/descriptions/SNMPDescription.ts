import type { INodeProperties } from 'n8n-workflow';

export const snmpOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'snmp',
				],
			},
		},
		options: [
			{
				name: 'Create SNMP Configuration',
				value: 'createSNMPConfiguration',
				description: 'Create a new SNMP configuration',
				action: 'Create SNMP configuration',
				routing: {
					request: {
						method: 'POST',
						url: '/snmp',
					},
				},
			},
			{
				name: 'Delete SNMP Configuration',
				value: 'deleteSNMPConfiguration',
				description: 'Delete an SNMP configuration',
				action: 'Delete SNMP configuration',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/snmp/{{$parameter.snmpId}}',
					},
				},
			},
			{
				name: 'Retrieve SNMP Configuration (All)',
				value: 'getSNMPConfiguration',
				description: 'Retrieve an SNMP configuration',
				action: 'Retrieve SNMP configuration',
				routing: {
					request: {
						method: 'GET',
						url: '/snmp',
					},
				},
			},
			{
				name: 'Retrieve SNMP Configuration (By ID)',
				value: 'getSNMPConfigurationById',
				description: 'Retrieve an SNMP configuration by ID',
				action: 'Retrieve SNMP configuration by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/snmp/{{$parameter.snmpId}}',
					},
				},
			},
			{
				name: 'Update SNMP Configuration',
				value: 'updateSNMPConfiguration',
				description: 'Update an SNMP configuration',
				action: 'Update SNMP configuration',
				routing: {
					request: {
						method: 'PUT',
						url: '=/snmp/{{$parameter.snmpId}}',
					},
				},
			},
		],
		default: 'getSNMPConfiguration',
	},
];

export const snmpFields: INodeProperties[] = [
	// Fields for Create SNMP Configuration
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'The name of the SNMP configuration',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Get Community Name',
		name: 'getCommunityName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'Get community name of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'getCommunityName',
			},
		},
	},
	{
		displayName: 'Set Community Name',
		name: 'setCommunityName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'Set community name of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'setCommunityName',
			},
		},
	},
	{
		displayName: 'Tenant Default',
		name: 'tenantDefault',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: false,
		description: 'Whether this is the default configuration for the tenant',
		routing: {
			send: {
				type: 'body',
				property: 'tenantDefault',
			},
		},
	},
	{
		displayName: 'Security Level',
		name: 'securityLevel',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		options: [
			{
				name: 'No Auth No Privacy',
				value: 'NO_AUTH_NO_PRIVACY',
			},
			{
				name: 'Auth No Privacy',
				value: 'AUTH_NO_PRIVACY',
			},
			{
				name: 'Auth Privacy',
				value: 'AUTH_PRIVACY',
			},
		],
		default: 'NO_AUTH_NO_PRIVACY',
		description: 'The security level of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'securityLevel',
			},
		},
	},
	{
		displayName: 'Version',
		name: 'version',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		options: [
			{
				name: 'V1',
				value: 'V1',
			},
			{
				name: 'V2c',
				value: 'V2c',
			},
			{
				name: 'V3',
				value: 'V3',
			},
		],
		default: 'V1',
		description: 'The version of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'version',
			},
		},
	},
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'The user for SNMP authentication',
		routing: {
			send: {
				type: 'body',
				property: 'user',
			},
		},
	},
	{
		displayName: 'Context Name',
		name: 'contextName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'The context name for SNMP',
		routing: {
			send: {
				type: 'body',
				property: 'contextName',
			},
		},
	},
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		options: [
			{
				name: 'MD5',
				value: 'MD5',
			},
			{
				name: 'SHA',
				value: 'SHA',
			},
			{
				name: 'SHA2',
				value: 'SHA2',
			},
		],
		default: 'SHA',
		description: 'The authentication setting of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'authentication',
			},
		},
	},
	{
		displayName: 'Privacy',
		name: 'privacy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		options: [
			{
				name: 'DES',
				value: 'DES',
			},
			{
				name: 'AES',
				value: 'AES',
			},
			{
				name: '3DES',
				value: '3DES',
			},
		],
		default: 'AES',
		description: 'The privacy setting of the configuration',
		routing: {
			send: {
				type: 'body',
				property: 'privacy',
			},
		},
	},
	{
		displayName: 'Network IDs',
		name: 'networkIds',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['createSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: { networkId: [{ id: '' }] },
		description: 'List of network IDs',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'networkId',
				displayName: 'Network ID',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Network ID',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'networkIds',
				value: '={{$parameter.networkIds.networkId ? $parameter.networkIds.networkId.map(item => item.id) : []}}',
			},
		},
	},
	// Fields for existing operations
	{
		displayName: 'SNMP ID',
		name: 'snmpId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['snmp'],
				operation: ['getSNMPConfigurationById', 'deleteSNMPConfiguration', 'updateSNMPConfiguration'],
			},
		},
		default: '',
		description: 'The ID of the SNMP configuration to retrieve',
	},
];