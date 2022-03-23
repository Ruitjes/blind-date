import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='bg-gray-700 flex flex-col h-full overflow-hidden'>

      <div className="flex flex-grow bg-pink-400">
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow align-center items-center justify-center skew-y-12'>
            <h1 className="text-white text-center text-4xl font-medium">Ask a question</h1>
          </div>
        </div>
      </div>

      <div className='flex h-16 bg-inherit'>
        <div className="flex flex-grow bg-inherit -skew-y-12"/>
      </div>

      <div className="flex flex-grow bg-blue-500">
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow align-center items-center justify-center skew-y-12'>
            <h1 className="text-white text-center text-4xl font-medium">Answer a question</h1>
          </div>
        </div>
      </div>

      <div className="flex absolute inset-0">
        <div className="flex h-36 w-36 m-auto justify-center rounded-full bg-white">
          <h1 className="self-center text-center text-4xl font-medium">Or</h1>
        </div>
      </div>

    </div>
  )
}

export default Home
