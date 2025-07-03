# n8n-nodes-printix-cloud-print

An n8n community node that provides integration with [Printix Cloud Print](https://printix.net/). This node allows you to interact with the Printix Cloud Print API to manage printers, users, sites, networks, groups, and print jobs in your n8n workflows.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Credentials](#credentials)
- [Supported Resources](#supported-resources)
- [Operations](#operations)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install this community node in n8n:

### Community Nodes (Recommended)
1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Select **Install** and enter `n8n-nodes-printix-cloud-print`
3. Click **Install**

### Manual Installation
```bash
# In your n8n installation directory
npm install n8n-nodes-printix-cloud-print
```

### Docker
```bash
# For n8n running in Docker, you can install it via environment variable
docker run -it --rm --name n8n -p 5678:5678 -e N8N_NODES_INCLUDE=n8n-nodes-printix-cloud-print n8nio/n8n
```

## Prerequisites

- n8n version 1.0 or higher
- A valid Printix Cloud Print account
- OAuth2 API credentials from Printix Cloud Print

## Credentials

This node uses OAuth2 Client Credentials authentication. You'll need to set up credentials in n8n:

1. In n8n, create new credentials for "Printix Cloud Print OAuth2 API"
2. Fill in the required fields:
   - **Client ID**: Your Printix OAuth2 client ID
   - **Client Secret**: Your Printix OAuth2 client secret
   - **Tenant ID**: Your Printix tenant ID (e.g., `81783a35-c65e-426d-a7c4-fc4b15cb779e`)
   - **Base URL**: The API base URL (defaults to `https://api.printix.net/cloudprint/tenants/{{$credentials.tenantId}}`)

### Getting API Credentials

To obtain your API credentials:
1. Log in to your Printix Cloud Print admin portal
2. Navigate to **API Settings** or **Integrations**
3. Create a new OAuth2 application
4. Copy the Client ID, Client Secret, and your Tenant ID

For detailed instructions, visit the [Printix API documentation](https://docs.printix.net).

## Supported Resources

This node supports the following Printix Cloud Print resources:

- **Printers** - Manage and query printers
- **Users** - Manage user accounts and permissions
- **Sites** - Manage printing sites and locations
- **Networks** - Manage network configurations
- **Groups** - Manage user and printer groups
- **Jobs** - Manage and monitor print jobs

## Operations

### Printer Operations
- **Get Many**: Retrieve a list of all printers
- **Get Printer**: Get specific printer information by ID, name, serial number, location, model, or vendor

### Additional Operations
Each resource supports various operations for creating, reading, updating, and managing the respective entities. The specific operations available depend on the resource selected.

## Configuration

When using the node in your workflow:

1. **Select Resource**: Choose the type of resource you want to work with (Printer, User, Site, etc.)
2. **Select Operation**: Choose the specific operation you want to perform
3. **Configure Parameters**: Fill in the required parameters based on your selected operation
4. **Set Credentials**: Ensure your Printix Cloud Print OAuth2 credentials are configured

## Usage Examples

### Example 1: Get All Printers
```json
{
  "resource": "printer",
  "operation": "getMany"
}
```

### Example 2: Find Printer by Name
```json
{
  "resource": "printer",
  "operation": "getPrinter",
  "printerName": "Office Printer 01"
}
```

### Example 3: Get Print Jobs
```json
{
  "resource": "job",
  "operation": "getMany"
}
```

## Development

### Setup Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/ElasticIT-LLC/n8n-nodes-printix-cloud-print.git
   cd n8n-nodes-printix-cloud-print
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the node:
   ```bash
   pnpm build
   ```

4. Link to your local n8n installation:
   ```bash
   cd ~/.n8n/nodes
   ln -s /path/to/n8n-nodes-printix-cloud-print n8n-nodes-printix-cloud-print
   ```

### Development Scripts

- `pnpm build` - Build the node
- `pnpm dev` - Build and watch for changes
- `pnpm lint` - Run linting
- `pnpm lintfix` - Fix linting issues automatically
- `pnpm format` - Format code with Prettier

### Local Testing

To test the node locally with n8n:

1. Start n8n in development mode:
   ```bash
   n8n start --dev
   ```

2. The node should appear in the node palette under "Printix Cloud Print"

For detailed development guidance, refer to the [n8n node development documentation](https://docs.n8n.io/integrations/creating-nodes/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the linter (`pnpm lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Resources

- [Printix Cloud Print](https://printix.net/)
- [Printix API Documentation](https://docs.printix.net)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [n8n Node Development](https://docs.n8n.io/integrations/creating-nodes/)

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ElasticIT-LLC/n8n-nodes-printix-cloud-print/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact [robertb@elasticit.com](mailto:robertb@elasticit.com) for support

## Author

**Robert Birone**  
Email: [robertb@elasticit.com](mailto:robertb@elasticit.com)  
Company: [ElasticIT LLC](https://www.elasticit.com/)

## License

[MIT](LICENSE.md) © ElasticIT LLC
