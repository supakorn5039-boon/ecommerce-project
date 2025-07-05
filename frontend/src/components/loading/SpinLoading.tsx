const SpinnerLoadingDot = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-75"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-150"></div>
      </div>
    </div>
  );
};

const SpinnerLoadingPulse = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary opacity-20"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  );
};

const SpinnerLoadingDualRing = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-10 h-10">
        <div className="w-full h-full border-4 border-primary border-opacity-20 rounded-full"></div>
        <div className="w-full h-full border-4 border-primary border-t-transparent animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const SpinnerLoadingDataTable = () => {
  return (
    <div className="inset-0 flex items-center justify-center bg-card w-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary opacity-20"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  );
};

const SpinnerLoadingPulseCard = () => {
  return (
    <div className="flex h-full inset-0 items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary opacity-20"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0"></div>
      </div>
    </div>
  );
};
const SpinnerLoadingCreateButton = () => (
  <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-4 h-4 mr-2"></span>
);

const SpinnerLoadingButton = () => (
  <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-4 h-4 mr-2"></span>
);

const SpinnerLoadingRemoveButton = () => (
  <span className="animate-spin border-2 border-red-main border-l-transparent rounded-full w-4 h-4 mr-2"></span>
);

export {
  SpinnerLoadingButton,
  SpinnerLoadingCreateButton,
  SpinnerLoadingDataTable,
  SpinnerLoadingDot,
  SpinnerLoadingDualRing,
  SpinnerLoadingPulse,
  SpinnerLoadingPulseCard,
  SpinnerLoadingRemoveButton,
};
