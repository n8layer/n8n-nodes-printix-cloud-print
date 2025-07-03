# n8n-nodes-printix-cloud-print

This is an n8n community node. It lets you use Printix Cloud Print in your n8n workflows.

Printix Cloud Print is a cloud-based printing management solution that enables secure, mobile, and flexible printing from anywhere.

This node provides comprehensive CRUD (Create, Read, Update, Delete) operations for managing printers, users, sites, networks, groups, print jobs, and SNMP configurations through the Printix Cloud Print API.

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
- **List Printers**: Retrieve a list of all printers with optional filtering and pagination
- **Get Printer Properties**: Get specific printer information by ID, name, serial number, location, model, or vendor

### Users
- **List Users**: Retrieve a list of all users with optional filtering and pagination
- **Find User By ID**: Get specific user information by ID
- **Create User**: Create a new user with email, full name, role, pin, and password
- **Delete User**: Delete a user by ID

### Sites
- **Query Many Sites**: Retrieve a list of all sites with optional pagination
- **Retrieve A Site**: Get specific site information by ID
- **Create A Site**: Create a new site with name, path, and network IDs
- **Delete A Site**: Delete a site by ID

### Networks
- **Query Many Networks**: Retrieve a list of all networks with optional pagination
- **Retrieve A Network**: Get specific network information by ID
- **Create A Network**: Create a new network with name, gateway settings, and optional site assignment
- **Delete A Network**: Delete a network by ID

### Groups
- **List Groups**: Retrieve a list of all groups with optional filtering and pagination
- **Fetch Group Details**: Get specific group information by ID
- **Create A Group**: Create a new group with name, external ID, identity provider, and description
- **Delete A Group**: Delete a group by ID

### Jobs
- **Retrieve Jobs**: Retrieve a list of all print jobs with optional filtering and pagination
- **Retrieve A Single Job**: Get specific job information by ID
- **Submit Job**: Submit a new print job with specified printing options (color, duplex, copies, media size, etc.)
- **Delete A Job**: Delete a print job by ID
- **Change Owner**: Change the owner of a print job to a different user
- **Complete Upload**: Complete the upload process and notify Printix that the job is ready for printing

### SNMP
- **Retrieve SNMP Configuration (All)**: Retrieve all SNMP configurations with optional pagination
- **Retrieve SNMP Configuration (By ID)**: Get specific SNMP configuration by ID
- **Create SNMP Configuration**: Create a new SNMP configuration with security settings and network associations
- **Update SNMP Configuration**: Update an existing SNMP configuration
- **Delete SNMP Configuration**: Delete an SNMP configuration by ID

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
