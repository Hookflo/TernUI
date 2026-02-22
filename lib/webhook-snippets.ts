export interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'coming-soon';
  secret?: string;
}

export interface CodeSnippet {
  framework: 'nextjs' | 'express' | 'cloudflare';
  code: string;
}

export const PLATFORMS: PlatformConfig[] = [
  { id: 'stripe', name: 'Stripe', icon: '💳', status: 'active' },
  { id: 'github', name: 'GitHub', icon: '🐙', status: 'active' },
  { id: 'clerk', name: 'Clerk', icon: '🔐', status: 'active' },
  { id: 'twilio', name: 'Twilio', icon: '📱', status: 'active' },
  { id: 'sendgrid', name: 'SendGrid', icon: '📧', status: 'active' },
];

export const SNIPPETS: Record<string, Record<string, CodeSnippet>> = {
  stripe: {
    nextjs: {
      framework: 'nextjs',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const stripeConfig = {
    platform: 'stripe',
    secret: process.env.STRIPE_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      request,
      stripeConfig
    );

    if (!result.isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Verified webhook:', body.type);

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}`,
    },
    express: {
      framework: 'express',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.raw({ type: 'application/json' }));

app.post('/webhooks/stripe', async (req: Request, res: Response) => {
  const stripeConfig = {
    platform: 'stripe',
    secret: process.env.STRIPE_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      req,
      stripeConfig
    );

    if (!result.isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(req.body);
    console.log('Verified webhook:', body.type);

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`,
    },
    cloudflare: {
      framework: 'cloudflare',
      code: `import { WebhookVerificationService } from '@hookflo/tern';

export default {
  async fetch(request: Request, env: CloudflareEnv) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const stripeConfig = {
      platform: 'stripe',
      secret: env.STRIPE_WEBHOOK_SECRET,
      toleranceInSeconds: 300,
    };

    try {
      const result = await WebhookVerificationService.verify(
        request,
        stripeConfig
      );

      if (!result.isValid) {
        return new Response('Invalid signature', { status: 401 });
      }

      const body = await request.json();
      console.log('Verified webhook:', body.type);

      return new Response(JSON.stringify({ received: true }));
    } catch (error) {
      return new Response('Processing failed', { status: 500 });
    }
  },
};`,
    },
  },
  github: {
    nextjs: {
      framework: 'nextjs',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const githubConfig = {
    platform: 'github',
    secret: process.env.GITHUB_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      request,
      githubConfig
    );

    if (!result.isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('GitHub webhook event:', body.action);

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}`,
    },
    express: {
      framework: 'express',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.raw({ type: 'application/json' }));

app.post('/webhooks/github', async (req: Request, res: Response) => {
  const githubConfig = {
    platform: 'github',
    secret: process.env.GITHUB_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      req,
      githubConfig
    );

    if (!result.isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(req.body);
    console.log('GitHub event:', body.action);

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});`,
    },
    cloudflare: {
      framework: 'cloudflare',
      code: `import { WebhookVerificationService } from '@hookflo/tern';

export default {
  async fetch(request: Request, env: CloudflareEnv) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const githubConfig = {
      platform: 'github',
      secret: env.GITHUB_WEBHOOK_SECRET,
      toleranceInSeconds: 300,
    };

    try {
      const result = await WebhookVerificationService.verify(
        request,
        githubConfig
      );

      if (!result.isValid) {
        return new Response('Invalid signature', { status: 401 });
      }

      const body = await request.json();
      console.log('GitHub event:', body.action);

      return new Response(JSON.stringify({ received: true }));
    } catch (error) {
      return new Response('Processing failed', { status: 500 });
    }
  },
};`,
    },
  },
  clerk: {
    nextjs: {
      framework: 'nextjs',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const clerkConfig = {
    platform: 'clerk',
    secret: process.env.CLERK_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      request,
      clerkConfig
    );

    if (!result.isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Clerk event:', body.type);

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}`,
    },
    express: {
      framework: 'express',
      code: `import { WebhookVerificationService } from '@hookflo/tern';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.raw({ type: 'application/json' }));

app.post('/webhooks/clerk', async (req: Request, res: Response) => {
  const clerkConfig = {
    platform: 'clerk',
    secret: process.env.CLERK_WEBHOOK_SECRET,
    toleranceInSeconds: 300,
  };

  try {
    const result = await WebhookVerificationService.verify(
      req,
      clerkConfig
    );

    if (!result.isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(req.body);
    console.log('Clerk event:', body.type);

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    },
    cloudflare: {
      framework: 'cloudflare',
      code: `import { WebhookVerificationService } from '@hookflo/tern';

export default {
  async fetch(request: Request, env: CloudflareEnv) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const clerkConfig = {
      platform: 'clerk',
      secret: env.CLERK_WEBHOOK_SECRET,
      toleranceInSeconds: 300,
    };

    try {
      const result = await WebhookVerificationService.verify(
        request,
        clerkConfig
      );

      if (!result.isValid) {
        return new Response('Invalid signature', { status: 401 });
      }

      const body = await request.json();
      console.log('Clerk event:', body.type);

      return new Response(JSON.stringify({ received: true }));
    } catch (error) {
      return new Response('Processing failed', { status: 500 });
    }
  },
};`,
    },
  },
};
