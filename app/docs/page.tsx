import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Tern - Webhook Verification',
  description: 'Comprehensive documentation for Tern - Algorithm Agnostic Webhook Verification',
};

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Tern Documentation</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Installation</h3>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <pre className="text-sm overflow-x-auto">
                      <code>npm install @Hookflo/tern</code>
                    </pre>
                  </div>
                  <p className="text-muted-foreground">
                    Or using yarn:
                  </p>
                  <div className="bg-muted p-4 rounded-lg mt-2">
                    <pre className="text-sm overflow-x-auto">
                      <code>yarn add @Hookflo/tern</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Basic Usage</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{
`import { verifyWebhook, signWebhook } from '@Hookflo/tern';

// Verify a webhook
const isValid = verifyWebhook({
  payload: request.body,
  signature: request.headers['x-webhook-signature'],
  secret: process.env.WEBHOOK_SECRET,
  algorithm: 'sha256' // or 'sha1', 'sha512'
});

// Generate a signature
const signature = signWebhook({
  payload: { event: 'user.created', id: '123' },
  secret: 'your-secret-key',
  algorithm: 'sha256'
});`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium">verifyWebhook</h3>
                  <p className="text-muted-foreground mt-1">Verifies a webhook signature.</p>
                  
                  <h4 className="font-medium mt-4 mb-2">Parameters</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">payload</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>The webhook payload (object or string)</span>
                    </li>
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">signature</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>The signature from the webhook header</span>
                    </li>
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">secret</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>Your webhook secret key</span>
                    </li>
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">algorithm</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>Hashing algorithm ('sha1', 'sha256', or 'sha512')</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2">Returns</h4>
                  <div className="text-sm">
                    <code className="bg-muted px-2 py-0.5 rounded">boolean</code>
                    <span className="text-muted-foreground ml-2">Whether the signature is valid</span>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-medium">signWebhook</h3>
                  <p className="text-muted-foreground mt-1">Generates a signature for a webhook payload.</p>
                  
                  <h4 className="font-medium mt-4 mb-2">Parameters</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">payload</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>The payload to sign (object or string)</span>
                    </li>
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">secret</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>Your webhook secret key</span>
                    </li>
                    <li className="flex">
                      <code className="bg-muted px-2 py-0.5 rounded">algorithm</code>
                      <span className="mx-2 text-muted-foreground">-</span>
                      <span>Hashing algorithm ('sha1', 'sha256', or 'sha512')</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium mt-4 mb-2">Returns</h4>
                  <div className="text-sm">
                    <code className="bg-muted px-2 py-0.5 rounded">string</code>
                    <span className="text-muted-foreground ml-2">The generated signature</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Examples</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-2">Express.js Middleware</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{
`import express from 'express';
import { verifyWebhook } from '@Hookflo/tern';

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  
  if (!signature) {
    return res.status(401).json({ error: 'No signature provided' });
  }

  const isValid = verifyWebhook({
    payload: req.body,
    signature,
    secret: process.env.WEBHOOK_SECRET,
    algorithm: 'sha256'
  });

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the webhook
  console.log('Received webhook:', req.body);
  res.status(200).json({ received: true });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Next.js API Route</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{
`import { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhook } from '@Hookflo/tern';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-webhook-signature'] as string;
  
  if (!signature) {
    return res.status(401).json({ error: 'No signature provided' });
  }

  const isValid = verifyWebhook({
    payload: req.body,
    signature,
    secret: process.env.WEBHOOK_SECRET!,
    algorithm: 'sha256'
  });

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the webhook
  console.log('Received webhook:', req.body);
  res.status(200).json({ received: true });
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
