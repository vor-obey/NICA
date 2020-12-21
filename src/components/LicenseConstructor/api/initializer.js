export const LICENSE_KEY = 'LICENSE_CONSTRUCTOR';

const defaultValues = {
  title: '',
  description: '',
  levels: [],
};

const initializer = (license) => {
  if (license) {
    return license;
  }
  const savedLicense = localStorage.getItem(LICENSE_KEY);
  if (savedLicense) {
    return JSON.parse(savedLicense);
  }
  return defaultValues;
};

export default initializer;
