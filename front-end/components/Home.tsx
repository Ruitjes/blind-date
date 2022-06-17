import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Suppress from './Suppress';

const Home = () => {

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

  const navigateToMyBookmakrs = () => {
    router.push('/myBookmarks')
  }

  return (
    <div className='bg-gray-700 flex flex-col h-full overflow-hidden'>

      <div className="flex flex-grow bg-pink-400" onClick={navigateToAsk}>
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow items-center justify-center skew-y-12'>
            <Suppress cssOverride='hidden'>
              <button className="absolute text-white text-center text-4xl font-medium" onClick={navigateToAsk}>
                {t("Ask a question")}
              </button>
            </Suppress>
          </div>
        </div>
      </div>

      <div className='flex h-16 bg-inherit'>
        <div className="flex flex-grow bg-inherit -skew-y-12" />
      </div>

      <div className="flex flex-grow bg-blue-500" onClick={navigateToFeed}>
        <div className='flex flex-grow -skew-y-12 bg-inherit'>
          <div className='flex flex-grow items-center justify-center skew-y-12'>
            <Suppress cssOverride='hidden'>
              <button className="absolute text-white text-center text-4xl font-medium" onClick={navigateToFeed}>
                {t('Answer a question')}
              </button>
            </Suppress>
          </div>
        </div>
      </div>

      <Suppress cssOverride='hidden'>
        <div className="flex absolute inset-0 pointer-events-none">
          <div className="flex h-36 w-36 m-auto justify-center rounded-full bg-white">
            <h1 className="self-center text-center text-4xl font-medium">
              {t('Or')}
            </h1>
          </div>
        </div>
      </Suppress>

      <Suppress cssOverride='bg-black/50'>
        <div className="flex absolute left-0 bottom-0 p-4">
          <div className="flex flex-col cursor-pointer" onClick={navigateToProfile}>
            <FontAwesomeIcon color='white' size='2x' icon={['fas', 'user-alt']} />
            <p className="text-white font-medium">
              {t("My Profile")}
            </p>
          </div>
        </div>

        <div className="flex absolute center right-28 bottom-0 p-4">
          <div className="flex flex-col cursor-pointer" onClick={navigateToMyBookmakrs}>
            <FontAwesomeIcon color='white' size='2x' icon={['fas', 'bookmark']} />
            <p className="text-white font-medium">
              {t("My Bookmarks")}
            </p>
          </div>
        </div>

        <div className="flex absolute right-0 bottom-0 p-4">
          <div className="flex flex-col cursor-pointer" onClick={navigateToMyQuestions}>
            <FontAwesomeIcon color='white' size='2x' icon={['fas', 'book-open']} />
            <p className="text-white font-medium">
              {t("My Questions")}
            </p>
          </div>
        </div>
      </Suppress>


    </div>
  )
}

export default Home
