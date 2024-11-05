#!/bin/bash
mkdir -p ./certificates

# Generate CA private key and certificate
openssl genrsa -out ./certificates/ca-key.pem 2048
openssl req -x509 -new -nodes -key ./certificates/ca-key.pem -sha256 -days 365 -out ./certificates/ca.pem -subj "//CN=Development CA"

# Generate server private key and CSR
openssl genrsa -out ./certificates/server-key.pem 2048
openssl req -new -key ./certificates/server-key.pem -out ./certificates/server.csr -subj "/CN=localhost"

# Generate server certificate
openssl x509 -req -in ./certificates/server.csr -CA ./certificates/ca.pem -CAkey ./certificates/ca-key.pem -CAcreateserial -out ./certificates/server-cert.pem -days 365 -sha256

# Clean up CSR
rm ./certificates/server.csr

