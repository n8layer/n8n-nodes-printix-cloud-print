# n8n-nodes-printix-cloud-print

This is an n8n community node. It lets you use Printix Cloud Print in your n8n workflows.

Printix Cloud Print is a cloud-based printing management solution that enables secure, mobile, and flexible printing from anywhere.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

### Printers
- **Get Many**: Retrieve a list of all printers with optional filtering
- **Get Printer**: Get specific printer information by ID, name, serial number, location, model, or vendor

### Users
- **Get Many**: Retrieve a list of all users with optional filtering
- **Get User**: Get specific user information by ID or name

### Sites
- **Get Many**: Retrieve a list of all sites with optional filtering
- **Get Site**: Get specific site information by ID or name

### Networks
- **Get Many**: Retrieve a list of all networks with optional filtering
- **Get Network**: Get specific network information by ID or name

### Groups
- **Get Many**: Retrieve a list of all groups with optional filtering
- **Get Group**: Get specific group information by ID or name

### Jobs
- **Get Many**: Retrieve a list of all print jobs with optional filtering and pagination
- **Get Job**: Get specific job information by ID

### SNMP
- **Get Many**: Retrieve SNMP data for printers with optional filtering
- **Get SNMP**: Get specific SNMP information by printer ID

## Credentials

To use this node, you'll need to set up OAuth2 credentials with Printix Cloud Print. Here's how:

1. **Access your Printix Cloud Print admin portal**:
   - Log in to your Printix Cloud Print admin portal
   - Navigate to **API Settings** or **Integrations**

2. **Create OAuth2 Application**:
   - Create a new OAuth2 application
   - Note down the Client ID and Client Secret
   - Copy your Tenant ID from the admin portal

3. **In n8n**:
   - Create new credentials for "Printix Cloud Print OAuth2 API"
   - Enter the Client ID and Client Secret from your Printix application
   - Enter your Tenant ID (e.g., `9c10d362-2fca-47db-bece-1227e0331194`)
   - The Base URL will default to: `https://api.printix.net/cloudprint/tenants/{{$credentials.tenantId}}`
   - Save the credentials

## Compatibility

This node is compatible with n8n version 1.100.1 and above.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Printix Cloud Print](https://printix.net/)
* [Printix API Documentation](https://docs.printix.net)
