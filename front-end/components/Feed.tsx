import { useEffect } from "react";
import Button from "./Button";
import Question from "./Question";


const Feed = () => {
    return (
        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className='flex flex-col mt-4 mb-8'>
                        <div className='flex flex-col flex-grow p-4'>
                            <Question text="What to do on a first date when you’re visually impaired?" />
                        </div>
                    </div>

                    <div className='flex flex-col flex-grow'>
                        <textarea className="flex flex-grow resize-none rounded-lg p-2">

                        </textarea>
                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <Button icon="xmark" color="lightcoral" />
                            <Button icon="reply" color="lightsteelblue" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Feed;