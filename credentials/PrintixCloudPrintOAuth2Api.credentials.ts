import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PrintixCloudPrintOAuth2Api implements ICredentialType {
	name = 'printixCloudPrintOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Printix Cloud Print OAuth2 API';
	documentationUrl = 'https://docs.printix.net';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://auth.printix.net/oauth/token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
		},
		{
			displayName: 'Tenant ID',
			name: 'tenantId',
			type: 'string',
			required: true,
			default: '',
			description: 'Tenant ID (e.g., 81783a35-c65e-426d-a7c4-fc4b15cb779e)',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.printix.net/cloudprint/tenants/{{$credentials.tenantId}}',
		},
	];
}
