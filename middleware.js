import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// [isPublicRoute] is a helper function that defines which pages are PUBLIC
// (pages that do NOT require the user to be signed in).
// Example: sign-in, sign-up, or the homepage.

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    "/"
])

// This middleware protects all NON-public pages.
// - If the request goes to a public page -> allow access.
// - If the request goes to a protected page and the user is NOT signed in -> Clerk will redirect them to sign-in.
// - If the user is signed in -> allow access normally.
export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}

/**
 * هل تقصد انو صفحات تسجيل الدخول تعتبر ببلك لانها بتطلب من المستخدم يضيف بياناته فعشان هيك هي ببلك وما في اشي ثاني من معلومات مهمة او صفحة مهمة هي فقط بتطلب معلومات لغايات تسجيل دخول صح؟

ونفس الأشي جزئية تسجيل الخروج وبرضو صفحة الرئيسية لانو هي بتعرض فقط مقدمة عن الموقع فهي عامة ومافيها اشي خاص

والشرط الثاني انو اذا المستخدم دخل صفحة من الصفحات لي غير معرفة على انها ببلك وهوا مش مسجل دخول رح يتم منعه منها؟
 * 

YES, ABOUT EVERY QUESTION  ^
 */