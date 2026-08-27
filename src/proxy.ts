import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { authClient } from './lib/auth-client'


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await authClient.api.getSession({
        headers: await headers()
    })
    console.log(session)
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: '/dashboard',
}