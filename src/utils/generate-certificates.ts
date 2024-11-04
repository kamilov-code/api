/**
 * @file src\utils\generate-certificates.util.ts
 * @description Generates certificates script file
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 04/11/2024
 * @license MIT
 * @version 0.0.1
 */
import * as forge from "node-forge";
import * as fs from "fs";
import * as path from "path";

const environments = ["develop", "testing", "production"] as const;
type Environment = (typeof environments)[number];

const generateCertificates = async (env: Environment) => {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();

  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.setSubject([{ name: "commonName", value: `Kamilov Code ${env}` }]);
  cert.setIssuer([{ name: "commonName", value: "Kamilov Code" }]);
  cert.sign(keys.privateKey);

  const certsDir = path.join(process.cwd(), "certificates");

  const dir = path.join(certsDir, env);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  try {
    // Save to files in the respective environment folder
    fs.writeFileSync(
      path.join(dir, `${env}_certificate.pem`),
      forge.pki.certificateToPem(cert)
    );
    fs.writeFileSync(
      path.join(dir, `${env}_private_key.pem`),
      forge.pki.privateKeyToPem(keys.privateKey)
    );

    process.stdout.write(`generate: ${env} certificate and private key.\n`);
  } catch (error) {
    console.error(`Error generating certificates for ${env}:`, error);
  }
};

const generateAllCertificates = async () => {
  for (const env of environments) {
    await generateCertificates(env);
  }
};

generateAllCertificates().catch((error) => {
  console.error("An error occurred during certificate generation:", error);
});

export default generateCertificates;
