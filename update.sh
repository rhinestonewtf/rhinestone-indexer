#!/bin/bash

# Function to get RPC URL for a given network ID
get_rpc_url() {
    case $1 in
        1)
            echo "https://eth.llamarpc.com"
            ;;
        10)
            echo "https://mainnet.optimism.io"
            ;;
        137)
            echo "https://polygon.drpc.org"
            ;;
        42161)
            echo "https://arb1.arbitrum.io/rpc"
            ;;
        8453)
            echo "https://mainnet.base.org"
            ;;
          84532)
          echo "https://sepolia.base.org"
            ;;
        421614)
            echo "https://arbitrum-sepolia.drpc.org"
            ;;
11155420)
            echo "https://sepolia.optimism.io"
            ;;
          11155111)
            echo "https://sepolia.drpc.org"
            ;;
          *)
            echo "Not configured"
            ;;
    esac
}


CONFIG_FILE="config.yaml"

# Check if config file exists
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: Configuration file '$CONFIG_FILE' not found!"
    exit 1
fi

# Extract network IDs from the config file
# This looks for lines that start with "- id: " and extracts the number
network_ids=$(grep -E "^\s*-\s*id:\s*[0-9]+\s*$" "$CONFIG_FILE" | sed -E 's/^\s*-\s*id:\s*([0-9]+)\s*$/\1/')

echo "Found networks with IDs: $network_ids"
echo "----------------------------------------"

# Loop through each network ID
for network_id in $network_ids; do
    
    # Get RPC URL for this network
    rpc_url=$(get_rpc_url "$network_id")
    if [[ "$rpc_url" == "Not configured" ]]; then
        continue
    fi

    block_number=$(cast block-number --rpc-url "$rpc_url")
    echo "Block Number: $block_number"

    sed -i '' "/- id: $network_id/,/^  - id:/ s/start_block: [0-9]*/start_block: $block_number/" "$CONFIG_FILE"

done
