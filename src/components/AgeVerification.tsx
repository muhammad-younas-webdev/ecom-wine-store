import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

export function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerification = (isOfAge: boolean) => {
    if (isOfAge) {
      localStorage.setItem('ageVerified', 'true');
      setIsOpen(false);
    } else {
      // Redirect to a different page or show an error
      alert('You must be 21 or older to enter this site.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center section-title text-2xl">
            Age Verification Required
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 p-6">
          <img 
            src="https://casalarga.casasite.com/wp-content/uploads/2025/08/Logo.svg"
            alt="Casa Larga"
            className="h-16 w-auto"
          />
          <p className="text-center text-gray-medium">
            You must be 21 years of age or older to enter this site and purchase alcoholic beverages.
          </p>
          <div className="flex gap-4 w-full">
            <Button 
              onClick={() => handleVerification(true)}
              className="btn-casa flex-1"
            >
              I am 21 or older
            </Button>
            <Button 
              onClick={() => handleVerification(false)}
              variant="outline"
              className="flex-1 border-brown-light text-brown-dark hover:bg-brown-light hover:text-white"
            >
              I am under 21
            </Button>
          </div>
          <p className="text-xs text-gray-medium text-center">
            By entering this website, you affirm that you are of legal drinking age in the location where you reside.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}