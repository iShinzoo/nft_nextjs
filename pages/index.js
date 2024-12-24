import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Interact with Smart Contract</title>
        <meta name="description" content="Interact with Smart Contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-extrabold">Welcome to my site!</h1>
      </main>
    </div>
  )
}
