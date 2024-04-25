import { useState } from 'react';
import { FormVersion } from '../types';

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState(FormVersion.V1);

  return { activeTab, setActiveTab };
};
