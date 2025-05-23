# This script builds your custom node, deploys it to your n8n custom nodes folder,
# kills any running n8n process, and then restarts n8n.
#
# It dynamically determines the target directory based on the "name" field in package.json.
#
# Usage: .\deploy-node.ps1

# Stop on first error
$ErrorActionPreference = "Stop"

##############################
# Step 0: Get Package Name
##############################
# Use Node.js to extract the package name from package.json
$PACKAGE_NAME = node -p "require('./package.json').name"

if ([string]::IsNullOrEmpty($PACKAGE_NAME)) {
    Write-Error "Error: Could not determine package name from package.json."
    exit 1
}

# Set the target directory based on the package name
# For Podman on Windows, we need to use the podman machine path
$TARGET_DIR = "/var/lib/containers/storage/volumes/n8n-docker_n8n_storage/_data/custom/$PACKAGE_NAME"

Write-Host "Detected package name: '$PACKAGE_NAME'"
Write-Host "Target deployment directory: '$TARGET_DIR'"

##############################
# Step 1: Build the Node
##############################
Write-Host "Building the node..."
pnpm run build

##############################
# Step 2: Deploy the Build Output
##############################
# Define the source (build output) directory
$SOURCE_DIR = "./dist"

Write-Host "Deploying build output from '$SOURCE_DIR' to '$TARGET_DIR'..."

# Remove any previous deployment and recreate the target directory
podman machine ssh "sudo rm -rf $TARGET_DIR"
podman machine ssh "sudo mkdir -p $TARGET_DIR"

# Create a temporary directory in the Podman VM
Write-Host "Copying files to Podman VM..."
podman machine ssh "mkdir -p /tmp/n8n-deploy"

# Create a tar archive and copy it to the VM
Write-Host "Creating archive..."
$tempTar = "temp.tar"
tar -cf $tempTar -C $SOURCE_DIR .

Write-Host "Transferring archive..."
# Copy the tar file to the VM
podman machine ssh "rm -f /tmp/temp.tar"
Get-Content $tempTar -Raw | podman machine ssh "cat > /tmp/temp.tar"

Write-Host "Extracting archive..."
podman machine ssh "cd /tmp/n8n-deploy && tar xf /tmp/temp.tar"

# Move files from temporary directory to final location
Write-Host "Moving files to final location..."
podman machine ssh "sudo cp -r /tmp/n8n-deploy/* $TARGET_DIR/"

# Clean up temporary files
Remove-Item -Path $tempTar -Force
podman machine ssh "rm -rf /tmp/n8n-deploy /tmp/temp.tar"

Write-Host "Deployment complete."

##############################
# Step 3: Restart n8n
##############################
Write-Host "Restarting n8n..."
podman container restart n8n-docker-n8n-1

# Logging for debugging
podman logs -f n8n-docker-n8n-1
