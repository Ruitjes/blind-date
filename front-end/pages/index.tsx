import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  useEffect(() => {
    document.title = "Home Page"
  }, [])
  
  const { t } = useTranslation();

  const router = useRouter();
  
  const navigateToFeed = () => {
    router.push('/feed');
  }
  const navigateToAsk = () => {
    router.push('/ask');
  }

  const navigateToProfile = () => {
    router.push('/profile');
  }

  const navigateToMyQuestions = () => {
    router.push('/myQuestions')
  }

  return (
    <div className='bg-gray-700 flex flex-col h-full overflow-hidden'>

      <div className="flex flex-grow bg-pink-400" onClick={navigateToAsk}>
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow items-center justify-center skew-y-12'>
            <button className="text-white text-center text-4xl font-medium" onClick={navigateToAsk}>Ask a question</button>
          </div>
        </div>
      </div>

      <div className='flex h-16 bg-inherit'>
        <div className="flex flex-grow bg-inherit -skew-y-12"/>
      </div>

      <div className="flex flex-grow bg-blue-500" onClick={navigateToFeed}>
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow items-center justify-center skew-y-12'>
            <button className="text-white text-center text-4xl font-medium" onClick={navigateToFeed}>Answer a question</button>
          </div>
        </div>
      </div>

      <div className="flex absolute inset-0 pointer-events-none">
        <div className="flex h-36 w-36 m-auto justify-center rounded-full bg-white">
          <h1 className="self-center text-center text-4xl font-medium">{t('Hello World!')}</h1>
        </div>
      </div>

      <div className="flex absolute right-0 bottom-0 p-4">
        <div className="flex flex-col" onClick={navigateToMyQuestions}>
          <FontAwesomeIcon color='white' size='2x' icon={['fas', 'book-open']} />
          <p className="text-white font-medium">My Questions</p>
        </div>
      </div>

    </div>
  )
}

export default Home
