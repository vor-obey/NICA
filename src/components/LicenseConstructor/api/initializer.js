export const NEW_LICENSE_KEY = 'NEW_LICENSE';

const defaultValues = {
  title: '',
  description: '',
  levels: [],
};

const initializer = (license) => {
  if (license) {
    return license;
  }
  const savedLicense = localStorage.getItem(NEW_LICENSE_KEY);
  if (savedLicense) {
    return JSON.parse(savedLicense);
  }
  return defaultValues;
};

export default initializer;
