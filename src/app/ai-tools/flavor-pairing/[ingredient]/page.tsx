import { redirect } from 'next/navigation';

// Visiting the bare /ai-tools/flavor-pairing route redirects to a sensible
// default so there's always a canonical, shareable ingredient URL.
export default function FlavorPairingIndexPage() {
    redirect('/ai-tools/flavor-pairing/chicken');
}