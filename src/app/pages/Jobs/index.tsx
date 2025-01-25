import { Button } from 'app/components/ui/button';
import { Sheet, SheetTrigger } from 'app/components/ui/sheet';
import { selectUser } from 'app/slice/selectors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateJobSheet from './components/create-job-sheet';

export function Jobs() {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <div className="relative w-full min-h-screen">
        {user?.isEmployer && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="special"
                className="px-5 py-4 absolute right-1 top-1"
              >
                Create a Job
              </Button>
            </SheetTrigger>
            <CreateJobSheet show={show} setShow={setShow} heading="Add a Job" />
          </Sheet>
        )}
        <div className="p-5 flex items-center justify-center flex-wrap">
          {/* all the jobs inside this container  */}
        </div>
      </div>
    </React.Fragment>
  );
}
