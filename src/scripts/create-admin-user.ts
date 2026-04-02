import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

const args = process.argv.slice(2);
const [email, password, ...nameParts] = args;

if (!email || !password) {
  console.error('Usage: npm run create-admin -- <email> <password> [full name]');
  process.exit(1);
}

const fullName = nameParts.join(' ').trim() || 'Admin User';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing required env vars. Set NEXT_PUBLIC_SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.',
  );
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function findUserByEmail(targetEmail: string): Promise<User | null> {
  let page = 1;
  const normalizedEmail = targetEmail.toLowerCase();

  while (true) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 200,
    });

    if (error) {
      throw error;
    }

    const users = data.users as User[];
    const user = users.find((entry) => entry.email?.toLowerCase() === normalizedEmail);
    if (user) {
      return user;
    }

    if (users.length < 200) {
      return null;
    }

    page += 1;
  }
}

async function main() {
  const existingUser = await findUserByEmail(email);

  let userId = existingUser?.id;

  if (!existingUser) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

    if (error || !data.user) {
      throw error ?? new Error('Failed to create auth user.');
    }

    userId = data.user.id;
    console.log(`Created auth user: ${email}`);
  } else {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
      password,
      email_confirm: true,
      user_metadata: {
        ...(existingUser.user_metadata || {}),
        full_name: fullName,
      },
    });

    if (error) {
      throw error;
    }

    console.log(`Existing auth user found. Updated password/profile metadata for: ${email}`);
  }

  const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
    {
      id: userId,
      email,
      full_name: fullName,
      role: 'admin',
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'id',
    },
  );

  if (profileError) {
    throw profileError;
  }

  console.log(`Admin profile ready for ${email}`);
  console.log('You can now sign in with this account and access admin-only server routes.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
