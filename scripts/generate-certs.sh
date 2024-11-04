# Generate a private key
openssl genrsa -out certs/localhost.key 2048

# Generate a self-signed certificate
openssl req -new -x509 -key certs/localhost.key -out certs/localhost.crt -days 365 -subj "//C=IL/ST=Dan/L=TelAviv/O=Kamilov Code/CN=localhost"
