import { useFormBuilder } from './useFormBuilder';
import { useTabs } from './useTabs';

export const useFormSection = () => {
  const tabsProps = useTabs();
  const formBuilderProps = useFormBuilder({ formVersion: tabsProps.activeTab });

  return { ...tabsProps, ...formBuilderProps };
};
