import clientPromise from '../lib/mongodb'
import LoginBtn from '@/components/login-btn'
import { mdiCheckCircle, mdiCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

type ConnectionStatus = {
  isConnected: boolean
  collections: number
}

export const getServerSideProps = (async () => {
  try {
    const client = await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    const collections = ((await client.db().stats()).collections as number) || 0

    return {
      props: { isConnected: true, collections },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false, collections: 0 },
    }
  }
}) satisfies GetServerSideProps<ConnectionStatus>

export default function Home({
  isConnected,
  collections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>git-started</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>git-started</h1>

        <p className="flex gap-1">
          Database connection:
          {isConnected ? (
            <span className="flex gap-1 text-green-500">
              <Icon path={mdiCheckCircle} size={1} />
              successful
            </span>
          ) : (
            <span className="flex gap-1 text-red-500">
              <Icon path={mdiCircleOutline} size={1} />
              failed
            </span>
          )}
        </p>

        {isConnected && <p>Database has {collections} collections</p>}

        <LoginBtn />
      </div>
    </>
  )
}
