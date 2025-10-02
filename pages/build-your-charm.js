// pages/build-your-charm.js

// This page is intentionally blank because we redirect users to the Shopify charm bar.
// Next.js will run getServerSideProps on every request and send a 307 redirect.

export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://graceandgoldcompany.com/pages/charm-bar',
      permanent: false, // use true if you want a 308 permanent redirect
    },
  };
}

export default function BuildYourCharmRedirect() {
  // We return null because the redirect happens before the component renders.
  return null;
}
